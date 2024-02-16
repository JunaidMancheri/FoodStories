import { IPostsServiceServer } from '@food-stories/common/typings';
import  { makeUnaryCallHandler} from '@food-stories/common/grpc';
import { Logger, logger } from '@food-stories/posts-srv/core';



export const PostsServiceImpl : IPostsServiceServer = {}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapHandler(handlerFactory: any) {
  return makeUnaryCallHandler(handlerFactory(Logger), logger) 
}