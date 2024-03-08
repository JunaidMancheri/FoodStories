import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from '@food-stories/common/handlers';
import { ISearchUserRequest, ISearchUserResponse } from '@food-stories/common/typings';
import { userModel } from '../interface/db/mongodb/models/user.model';

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