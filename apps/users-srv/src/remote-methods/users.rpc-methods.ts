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
} from '@food-stories/users-srv/user';
import { Logger, logger } from '@food-stories/users-srv/core';
import { kafkaClient } from '../config/kafka.config';
import { createProducer } from '@food-stories/common/kafka';
import { makeFollowAUserHandler, makeUnfollowAUserHandler } from '@food-stories/users-srv/social-network';
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
};

export const SocialNetworkServiceImpl: ISocialNetworkServiceServer = {
  followAUser: makeUnaryCallHandler(makeFollowAUserHandler(neo4jDriver), logger),
  unfollowAUser: makeUnaryCallHandler(makeUnfollowAUserHandler(neo4jDriver), logger)
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapHandler(handlerFactory: any) {
  return makeUnaryCallHandler(handlerFactory(Logger), logger);
}
