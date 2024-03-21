import {
  ICommentsServiceServer,
  IPostsServiceServer,
} from '@food-stories/common/typings';
import { makeUnaryCallHandler } from '@food-stories/common/grpc';
import {
  Logger,
  logger,
  LikesLogger,
  CommentsLogger,
} from '@food-stories/posts-srv/core';
import {
  makeCreatePostHandler,
  makeGetUsersPostsHandler,
  makeUpdateMediaUrlsHandler,
} from '@food-stories/posts-srv//post';
import { ILikesServiceServer } from '@food-stories/common/typings';
import { LikeModule } from '@food-stories/posts-srv/like';
import { CommentsModule } from '@food-stories/posts-srv/comment';
import { createProducer } from '@food-stories/common/kafka';
import { kafkaClientForPosts } from './config/kafka.config';

const commentsModuleMethods =
  CommentsModule.initialize(CommentsLogger).getRpcHanlders();

export const CommentsServiceImpl: ICommentsServiceServer = {
  addComment: wrapModuleHandler(commentsModuleMethods.addComment),
  getCommentsForAPost: wrapModuleHandler(
    commentsModuleMethods.getCommentsForAPost
  ),
};

const likesModuleMethods = LikeModule.initialize(LikesLogger, createProducer(kafkaClientForPosts)).getRpcHandlers();

export const LikesServiceImpl: ILikesServiceServer = {
  isPostLiked: wrapModuleHandler(likesModuleMethods.isPostLikedHandler),
  likeAPost: wrapModuleHandler(likesModuleMethods.likeAPostHandler),
  unlikeAPost: wrapModuleHandler(likesModuleMethods.unLikeAPostHandler),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapModuleHandler(handleFn: any) {
  return makeUnaryCallHandler(handleFn, logger);
}

export const PostsServiceImpl: IPostsServiceServer = {
  createPost: makeUnaryCallHandler(makeCreatePostHandler(Logger, createProducer(kafkaClientForPosts)), logger),
  updatePostMediaUrls: wrapHandler(makeUpdateMediaUrlsHandler),
  getUsersPosts: wrapHandler(makeGetUsersPostsHandler),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapHandler(handlerFactory: any) {
  return makeUnaryCallHandler(handlerFactory(Logger), logger);
}
