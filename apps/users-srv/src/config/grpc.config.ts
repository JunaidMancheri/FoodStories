/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Server } from '@grpc/grpc-js';
import { join } from 'path';
import { createStartGRPCServer, getGrpcServiceDefinition } from '@food-stories/common/grpc'
import { SocialNetworkServiceImpl, UsersServiceImpl } from '../remote-methods/users.rpc-methods';

const PROTO_PATH = join(__dirname, 'proto', 'users_service.proto')

const usersService = getGrpcServiceDefinition({
  packageName: 'users_service',
  protoPath: PROTO_PATH,
  serviceName: 'UsersService',
})

const socialNetworkService = getGrpcServiceDefinition({
  packageName: 'social_networks_service',
  protoPath: join(__dirname, 'proto', 'social_networks_service.proto'),
  serviceName: 'SocialNetworksService',
})

const grpcServer = new Server();

grpcServer.addService(usersService, UsersServiceImpl as any);
grpcServer.addService(socialNetworkService, SocialNetworkServiceImpl as any);

const startGRPCServer = createStartGRPCServer(grpcServer);

export  { startGRPCServer };