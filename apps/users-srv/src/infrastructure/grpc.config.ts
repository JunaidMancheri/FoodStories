import {  Server, sendUnaryData, ServerUnaryCall, GrpcObject, ServiceClientConstructor, loadPackageDefinition, ServerCredentials, ServiceDefinition, UntypedServiceImplementation } from '@grpc/grpc-js';
import { Options, loadSync } from '@grpc/proto-loader';
import { join } from 'path';
import {ICreateUserRequest, ICreateUserResponse, IUsersServiceServer } from '@food-stories/common/typings/proto/usersService'
import { ILogger } from '@food-stories/common/logger';
import { appConfig } from './app.config';

const PROTO_PATH = join(__dirname, 'proto', 'users_service.proto')



const userServiceImpl:  IUsersServiceServer = {
  CreateUser: function (call: ServerUnaryCall<ICreateUserRequest, ICreateUserResponse>, callback: sendUnaryData<ICreateUserResponse>): void {
    console.log(call.request.id);
    callback(null, {id: 89,  name:  'hiba hanna'});
  }
}

const grpcServer = new Server();



// eslint-disable-next-line @typescript-eslint/no-explicit-any
grpcServer.addService(userService, userServiceImpl as any);



export  { grpcServer };