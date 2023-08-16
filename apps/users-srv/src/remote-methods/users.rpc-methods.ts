import { IUsersServiceServer } from '@food-stories/common/typings/proto/usersService';



export const UsersServiceImpl : IUsersServiceServer = {
  CreateUser: (call, callback) => {
    const request = call.request;
    callback(null, {id: request.id, name: 'jithib'});
  }
}