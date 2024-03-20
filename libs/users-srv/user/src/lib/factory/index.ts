import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from '@food-stories/common/handlers';
import { IMakeAccountPrivateRequest, ISearchUserRequest, ISearchUserResponse } from '@food-stories/common/typings';
import { userModel } from '../interface/db/mongodb/models/user.model';
import { Producer } from 'kafkajs';

export * from './createUser.factory';
export * from './isUsernameAvailable.factory';
export * from './isRegisteredUser.factory';
export * from './getCurrentUserData.factory';
export * from './getUserData.factory';
export * from './udpateUserProfile.factory';

 
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