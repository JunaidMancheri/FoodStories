import { IPostsServiceServer } from '@food-stories/common/typings';
import  { makeUnaryCallHandler} from '@food-stories/common/grpc';
import { Logger, logger } from '@food-stories/posts-srv/core';
import { makeCreatePostHandler, makeGetUsersPostsHandler, makeUpdateMediaUrlsHandler} from '@food-stories/posts-srv//post'
import { ILikesServiceServer } from '@food-stories/common/typings';
import { makeLikeAPostHandler, makeUnLikeAPostHandler, makeIsPostLikedHandler, initiateLikesModule } from '@food-stories/posts-srv/like'


const likesModule = initiateLikesModule(Logger);

export const LikesServiceImpl: ILikesServiceServer = {
  isPostLiked: wrapHandler(likesModule.makeIsPostLikedHandler),
  likeAPost: wrapHandler(likesModule.makeLikeAPostHandler),
  unlikeAPost: wrapHandler(likesModule.makeUnLikeAPostHandler),

}


export const PostsServiceImpl : IPostsServiceServer = {
  createPost: wrapHandler(makeCreatePostHandler),
  updatePostMediaUrls: wrapHandler(makeUpdateMediaUrlsHandler),
  getUsersPosts: wrapHandler(makeGetUsersPostsHandler)
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapHandler(handlerFactory: any) {
  return makeUnaryCallHandler(handlerFactory(Logger), logger) 
}