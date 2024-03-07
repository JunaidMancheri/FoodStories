/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from '@grpc/grpc-js';
import { join } from 'path';
import { createStartGRPCServer, getGrpcServiceDefinition } from '@food-stories/common/grpc'
import { CommentsServiceImpl, LikesServiceImpl, PostsServiceImpl } from '../posts.rpc-methods';

const PROTO_PATH = join(__dirname, 'proto', 'posts_service.proto')
const LIKES_PROTO_PATH = join(__dirname, 'proto', 'likes_service.proto');
const COMMENTS_PROTO_PATH = join(__dirname, 'proto', 'comments_service.proto');

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

const commentsService = getGrpcServiceDefinition({
  packageName: 'comments_service',
  protoPath: COMMENTS_PROTO_PATH,
  serviceName: 'CommentsService',
})

const grpcServer = new Server();

grpcServer.addService(usersService, PostsServiceImpl as any);
grpcServer.addService(likesService,  LikesServiceImpl as any);
grpcServer.addService(commentsService, CommentsServiceImpl as any)

const startGRPCServer = createStartGRPCServer(grpcServer);

export  { startGRPCServer };