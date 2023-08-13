import {  Server, sendUnaryData, ServerUnaryCall, GrpcObject, ServiceClientConstructor, loadPackageDefinition, ServerCredentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { join } from 'path';
import {ICreateUserRequest, ICreateUserResponse, IUsersServiceServer } from '@food-stories/common/typings/proto/usersService'
import { ILogger } from '@food-stories/common/logger';
import { appConfig } from './app.config';

const PROTO_PATH = join(__dirname, 'proto', 'users_service.proto')


const usersPackageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  arrays: true,
});

const UsersService = (loadPackageDefinition(usersPackageDefinition) as GrpcObject) ;


const userConstructor = UsersService['users_service']['v1']['UsersService'] as ServiceClientConstructor;

const userService  = userConstructor.service

const userServiceImpl:  IUsersServiceServer = {
  CreateUser: function (call: ServerUnaryCall<ICreateUserRequest, ICreateUserResponse>, callback: sendUnaryData<ICreateUserResponse>): void {
    console.log(call.request.id);
    callback(null, {id: 89,  name:  'hiba hanna'});
  }
}

const grpcServer = new Server();



// eslint-disable-next-line @typescript-eslint/no-explicit-any
grpcServer.addService(userService, userServiceImpl as any);

export function startGRPCServer(logger: ILogger) {
  return new Promise<void>((resolve, reject) =>{
    grpcServer.bindAsync(appConfig.GRPC_PORT, ServerCredentials.createInsecure(), (err, port) => {
      if (err) reject(err);
      else {
        grpcServer.start();
        logger.info('grpc server connectted to port: ' + port);
        resolve();
      }
    })
  })
}

export  { grpcServer };