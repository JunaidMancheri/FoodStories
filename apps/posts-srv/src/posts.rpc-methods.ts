import { IPostsServiceServer } from '@food-stories/common/typings';
import  { makeUnaryCallHandler} from '@food-stories/common/grpc';
import { Logger, logger } from '@food-stories/posts-srv/core';
import { makeCreatePostHandler, makeGetUsersPostsHandler, makeUpdateMediaUrlsHandler} from '@food-stories/posts-srv//post'




export const PostsServiceImpl : IPostsServiceServer = {
  createPost: wrapHandler(makeCreatePostHandler),
  updatePostMediaUrls: wrapHandler(makeUpdateMediaUrlsHandler),
  getUsersPosts: wrapHandler(makeGetUsersPostsHandler)
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapHandler(handlerFactory: any) {
  return makeUnaryCallHandler(handlerFactory(Logger), logger) 
}