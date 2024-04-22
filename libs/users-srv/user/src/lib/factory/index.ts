/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseHandler, BaseSubscriber, RequestPayload, ResponsePayload, respondSuccess } from '@food-stories/common/handlers';
import { GetChartValuesResponse, GetUsersRequest, GetUsersResponse, IMakeAccountPrivateRequest, ISearchUserRequest, ISearchUserResponse } from '@food-stories/common/typings';
import { userModel } from '../interface/db/mongodb/models/user.model';
import { Producer } from 'kafkajs';
import { mapDocumentsToUserEntities } from '../interface/db/mongodb/mapper.helper';

export * from './createUser.factory';
export * from './isUsernameAvailable.factory';
export * from './isRegisteredUser.factory';
export * from './getCurrentUserData.factory';
export * from './getUserData.factory';
export * from './udpateUserProfile.factory';


export function makeGetUsersHandler() {
  return new GetUsersHandler();
}


export class GetChartValues extends BaseHandler {
   async execute(request: RequestPayload<void>): Promise<ResponsePayload<GetChartValuesResponse>> {
    const startOfPastYear = new Date();
    startOfPastYear.setFullYear(startOfPastYear.getFullYear() - 1);

      const results = await userModel.find({createdAt: {$gte: startOfPastYear}})
      const monthCounts = new Array(12).fill(0);

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      results.forEach(user => {
        const createdAt = new Date(user.createdAt);
        const monthIndex = (createdAt.getMonth() + 12 - currentMonth) % 12;
        monthCounts[monthIndex]++;
      });
      return respondSuccess({counts: monthCounts.reverse()})
  }


}

export  class GetUsersHandler extends BaseHandler {
 async execute(request: RequestPayload<GetUsersRequest>): Promise<ResponsePayload<GetUsersResponse>> {
    const usersDocs = await userModel.find().skip(request.data.page * request.data.size).limit(request.data.size);
    const count = await userModel.count();
    return respondSuccess({users: mapDocumentsToUserEntities(usersDocs), count})
  }
}

export class PostCreatedHandler extends BaseSubscriber {
  override event = 'Post.Created';
 async execute(payload: any): Promise<void> {
    await userModel.findByIdAndUpdate(payload.userId, {$inc: {postsCount: 1}});
  }

}


export class FollowedAUserEventSubscriber extends BaseSubscriber  {
  override event = 'User.Followed';
  async execute(payload: {followerId: string, followeeId: string}): Promise<void> {
      await userModel.findByIdAndUpdate(payload.followerId, {$inc: {followingsCount: 1}})
      await userModel.findByIdAndUpdate(payload.followeeId, {$inc: {followersCount: 1}})
  }

}

export class UnFollowedAUserEventSubscriber extends BaseSubscriber  {
  override event = 'User.UnFollowed';
  async execute(payload: {followerId: string, followeeId: string}): Promise<void> {
      await userModel.findByIdAndUpdate(payload.followerId, {$inc: {followingsCount: -1}})
      await userModel.findByIdAndUpdate(payload.followeeId, {$inc: {followersCount: -1}})
  }

}

 
class SearchUsersHandler  extends BaseHandler {
  async execute(request: RequestPayload<ISearchUserRequest>): Promise<ResponsePayload<ISearchUserResponse>> {
    const results = await  userModel.find({ $or : [
      {
        username: { $regex:new RegExp(`^${request.data.query}`, 'i')}
      }, 
      {
        name: { $regex:new RegExp(`^${request.data.query}`, 'i')}
      }
    ]})

    const mappedResults = results.map((doc) => ({ username: doc.username, DPURL: doc.DPURL, name: doc.name}));
    return respondSuccess({results: mappedResults});
  }
}


export function makeSearchUsersHanlder() {
  return new SearchUsersHandler();
}

export function makeAccountPRivateHandler(producer: Producer) {
  return new MakeAccountPrivateHandler(producer);
}

export function makeAccountpubliceHandler(producer: Producer) {
  return new MakeAccountPublicHandler(producer);
}



class MakeAccountPrivateHandler extends BaseHandler {
  constructor(private producer: Producer) {
   super();
  }


  async execute(request: RequestPayload<IMakeAccountPrivateRequest>): Promise<ResponsePayload<void>> {
       await userModel.findByIdAndUpdate(request.data.userId, {isPrivate: true});
       await this.producer.send({
        topic: 'User.Updated.Privacy',
        messages: [{value: JSON.stringify({userId: request.data.userId, isPrivate :  true})}]
       });
      return respondSuccess(void 0);
  }
}


class MakeAccountPublicHandler extends BaseHandler {
  constructor(private producer: Producer) {
   super();
  }


  async execute(request: RequestPayload<IMakeAccountPrivateRequest>): Promise<ResponsePayload<void>> {
       await userModel.findByIdAndUpdate(request.data.userId, {isPrivate: false});
       await this.producer.send({
        topic: 'User.Updated.Privacy',
        messages: [{value: JSON.stringify({userId: request.data.userId, isPrivate :  false})}]
       });
      return respondSuccess(void 0);
  }
}

