import {
  ISocialNetworkServiceServer,
  IUsersServiceServer,
} from '@food-stories/common/typings';
import { makeUnaryCallHandler } from '@food-stories/common/grpc';
import {
  makeCreateUserHandler,
  makeGetUserDataHandler,
  makeGetCurrentUserDataHandler,
  makeIsRegisteredUser,
  makeIsUsernameAvailableHandler,
  makeUpdateUserProfileHandler,
  makeSearchUsersHanlder,
  makeAccountPRivateHandler,
  makeAccountpubliceHandler,
} from '@food-stories/users-srv/user';
import { Logger, logger } from '@food-stories/users-srv/core';
import { kafkaClient, kafkaClient2 } from '../config/kafka.config';
import { createProducer } from '@food-stories/common/kafka';
import { makeBlockUserHandler, makeFollowAUserHandler, makeHasBlockedHandler, makeIsFollowingHandler, makeUnblockUserHandler, makeUnfollowAUserHandler } from '@food-stories/users-srv/social-network';
import { neo4jDriver } from '../config/neo4j.config';

export const UsersServiceImpl: IUsersServiceServer = {
  createUser: makeUnaryCallHandler(
    makeCreateUserHandler(Logger, createProducer(kafkaClient)),
    logger
  ),
  isUsernameAvailable: wrapHandler(makeIsUsernameAvailableHandler),
  isRegisteredUser: wrapHandler(makeIsRegisteredUser),
  getCurrentUserData: wrapHandler(makeGetCurrentUserDataHandler),
  getUserData: wrapHandler(makeGetUserDataHandler),
  updateUserProfile: wrapHandler(makeUpdateUserProfileHandler),
  searchUsers: wrapHandler(makeSearchUsersHanlder),
  makeAccountPrivate : makeUnaryCallHandler(makeAccountPRivateHandler(createProducer(kafkaClient2)), logger),
  makeAccountPublic: makeUnaryCallHandler(makeAccountpubliceHandler(createProducer(kafkaClient2)), logger)
};

export const SocialNetworkServiceImpl: ISocialNetworkServiceServer = {
  followAUser: makeUnaryCallHandler(makeFollowAUserHandler(neo4jDriver, createProducer(kafkaClient)), logger),
  unfollowAUser: makeUnaryCallHandler(makeUnfollowAUserHandler(neo4jDriver, createProducer(kafkaClient)), logger),
  isFollowing: makeUnaryCallHandler(makeIsFollowingHandler(neo4jDriver), logger),
  BlockUser: makeUnaryCallHandler(makeBlockUserHandler(neo4jDriver, createProducer(kafkaClient)), logger),
  unblockUser: makeUnaryCallHandler(makeUnblockUserHandler(neo4jDriver), logger),
  hasBlocked: makeUnaryCallHandler(makeHasBlockedHandler(neo4jDriver), logger),
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapHandler(handlerFactory: any) {
  return makeUnaryCallHandler(handlerFactory(Logger), logger);
}
