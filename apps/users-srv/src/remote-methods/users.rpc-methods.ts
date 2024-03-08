import { ISocialNetworkServiceServer, IUsersServiceServer } from '@food-stories/common/typings';
import  { makeUnaryCallHandler} from '@food-stories/common/grpc';
import { makeCreateUserHandler, makeGetUserDataHandler ,makeGetCurrentUserDataHandler, makeIsRegisteredUser, makeIsUsernameAvailableHandler, makeUpdateUserProfileHandler, makeSearchUsersHanlder } from '@food-stories/users-srv/user'
import { Logger, logger } from '@food-stories/users-srv/core';
import { makeFollowAUser, makeUnfollowAUser } from '@food-stories/users-srv/social-network';



export const UsersServiceImpl : IUsersServiceServer = {
  createUser: wrapHandler(makeCreateUserHandler),
  isUsernameAvailable: wrapHandler(makeIsUsernameAvailableHandler),
  isRegisteredUser: wrapHandler(makeIsRegisteredUser),
  getCurrentUserData: wrapHandler(makeGetCurrentUserDataHandler),
  getUserData: wrapHandler(makeGetUserDataHandler),
  updateUserProfile: wrapHandler(makeUpdateUserProfileHandler),
  searchUsers: wrapHandler(makeSearchUsersHanlder),
}


export const  SocialNetworkServiceImpl : ISocialNetworkServiceServer = {
  followAUser: wrapHandler(makeFollowAUser),
  unfollowAUser: wrapHandler(makeUnfollowAUser),
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapHandler(handlerFactory: any) {
  return makeUnaryCallHandler(handlerFactory(Logger), logger) 
}