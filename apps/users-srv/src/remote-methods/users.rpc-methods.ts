import { IUsersServiceServer } from '@food-stories/common/typings/proto/usersService';
import  { makeUnaryCallHandler} from '@food-stories/common/grpc/makeUnaryCallHandler.adapter';
import { makeCreateUserHandler } from '@food-stories/users-srv/user'



export const UsersServiceImpl : IUsersServiceServer = {
  CreateUser: makeUnaryCallHandler(makeCreateUserHandler(), 'user.created')
}