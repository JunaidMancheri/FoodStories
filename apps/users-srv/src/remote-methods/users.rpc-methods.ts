import { IUsersServiceServer } from '@food-stories/common/typings/proto/usersService';
import  { makeUnaryCallHandler} from '@food-stories/common/grpc/makeUnaryCallHandler.adapter';
import { makeCreateUserHandler, makeIsRegisteredUser, makeIsUsernameAvailableHandler } from '@food-stories/users-srv/user'
import { Logger } from '../config/logger.config';



export const UsersServiceImpl : IUsersServiceServer = {
  createUser: makeUnaryCallHandler(makeCreateUserHandler(Logger), 'user.created'),
  isUsernameAvailable: makeUnaryCallHandler(makeIsUsernameAvailableHandler(Logger), 'user.isUsernameAvailable'),
  isRegisteredUser: makeUnaryCallHandler(makeIsRegisteredUser(Logger), 'user.isRegisteredUser'),
}