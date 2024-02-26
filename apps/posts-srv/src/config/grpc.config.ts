import {  ListenerBuilder, Server } from '@grpc/grpc-js';
import { join } from 'path';
import { createStartGRPCServer, getGrpcServiceDefinition } from '@food-stories/common/grpc'
import { LikesServiceImpl, PostsServiceImpl } from '../posts.rpc-methods';

const PROTO_PATH = join(__dirname, 'proto', 'posts_service.proto')
const LIKES_PROTO_PATH = join(__dirname, 'proto', 'likes_service.proto');

const usersService = getGrpcServiceDefinition({
  packageName: 'posts_service',
  protoPath: PROTO_PATH,
  serviceName: 'PostsService',
})

const likesService = getGrpcServiceDefinition({
  packageName: 'likes_service',
  protoPath: LIKES_PROTO_PATH,
  serviceName: 'LikesService',
})

const grpcServer = new Server();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
grpcServer.addService(usersService, PostsServiceImpl as any);
grpcServer.addService(likesService,  LikesServiceImpl as any);

const startGRPCServer = createStartGRPCServer(grpcServer);

export  { startGRPCServer };