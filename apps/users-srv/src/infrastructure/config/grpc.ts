const PROTO_PATH = 'proto/users.proto';

import grpc, { GrpcObject, ServerUnaryCall, ServiceClientConstructor, handleUnaryCall, sendUnaryData } from '@grpc/grpc-js';

import protoLoader from '@grpc/proto-loader';


const usersPackageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  arrays: true,
});

const UsersService = (grpc.loadPackageDefinition(usersPackageDefinition) as GrpcObject) ;

const userConstructor = UsersService['UserService'] as ServiceClientConstructor;

const userService = userConstructor.service

const server = new grpc.Server();

interface MyRequest {
    name: string;
}

interface MyResponse {
  id: number;
}

interface IUserService {
  someMethod: handleUnaryCall<{name: string}, {id: number}>
}

const userServiceImpl: IUserService = {
  someMethod: function (call: grpc.ServerUnaryCall<{ name: string; }, { id: number; }>, callback: grpc.sendUnaryData<{ id: number; }>): void {
    call.request.name;
    callback(null, {id: 2});
  }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
server.addService(userService, userServiceImpl as any)