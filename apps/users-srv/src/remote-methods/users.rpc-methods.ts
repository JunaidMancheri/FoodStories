import { IUsersServiceServer } from '@food-stories/common/typings';
import  { makeUnaryCallHandler} from '@food-stories/common/grpc';
import { makeCreateUserHandler, makeGetUserDataHandler, makeIsRegisteredUser, makeIsUsernameAvailableHandler } from '@food-stories/users-srv/user'
import { Logger, logger } from '@food-stories/users-srv/core';



export const UsersServiceImpl : IUsersServiceServer = {
  createUser: wrapHandler(makeCreateUserHandler),
  isUsernameAvailable: wrapHandler(makeIsUsernameAvailableHandler),
  isRegisteredUser: wrapHandler(makeIsRegisteredUser),
  getUserData: wrapHandler(makeGetUserDataHandler),
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapHandler(handlerFactory: any) {
  return makeUnaryCallHandler(handlerFactory(Logger), logger) 
}