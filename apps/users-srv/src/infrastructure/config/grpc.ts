import { CreateUserRequest, CreateUserResponse, UsersServiceServiceName } from '@food-stories/common/gen/users_service';

import {  Server, sendUnaryData, ServerUnaryCall, GrpcObject, ServiceClientConstructor, handleUnaryCall, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { join } from 'path';

const PROTO_PATH = join(__dirname, 'proto', 'users_service.proto')


const usersPackageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  arrays: true,
});

const UsersService = (loadPackageDefinition(usersPackageDefinition) as GrpcObject) ;


const userConstructor = UsersService['users_service']['v1']['UsersService'] as ServiceClientConstructor;

const userService: any = userConstructor.service


console.log(userService.CreateUser.requestType)

const server = new Server();

interface IUserService {
  someMethod: handleUnaryCall<CreateUserRequest, CreateUserRequest>
}

const userServiceImpl: IUserService = {
  someMethod: function (call: ServerUnaryCall<CreateUserRequest, CreateUserResponse>, callback: sendUnaryData<CreateUserResponse>): void {
    console.log(call.request.id)
    callback(null, {id: 2, name: 'junaid'});
  }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
server.addService(userService, userServiceImpl as any)

export  { server };
