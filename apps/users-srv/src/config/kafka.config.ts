import { appConfig } from './app.config';
import { EVENTS } from '@food-stories/common/events';
import { Logger, logger } from '@food-stories/users-srv/core';
import { createKafkaClient } from '@food-stories/common/kafka';
import {
  makeConsumerAdapter,
  createConsumer,
} from '@food-stories/common/kafka';
import { makeUserCreatedSubscriber } from '@food-stories/users-srv/social-network';
import { neo4jDriver } from './neo4j.config';
import {
  FollowedAUserEventSubscriber,
  PostCreatedHandler,
  UnFollowedAUserEventSubscriber,
} from '@food-stories/users-srv/user';

export const kafkaClient = createKafkaClient(
  {
    clientId: 'social-networks-srv',
    hostUrl: appConfig.KAFKA_URI,
    username: appConfig.KAFKA_USERNAME,
    password: appConfig.KAFKA_PASSWORD,
  },
  new Logger('KAFKA')
);

export const kafkaClient2 = createKafkaClient(
  {
    clientId: 'users-srv',
    hostUrl: appConfig.KAFKA_URI,
    username: appConfig.KAFKA_USERNAME,
    password: appConfig.KAFKA_PASSWORD,
  },
  new Logger('KAFKA2')
);

export const topicsNeeded = [
  EVENTS.User.Created.v1,
  'User.Updated.Privacy',
  'User.Followed',
  'User.UnFollowed',
];

export const consumers = [
  makeConsumerAdapter(
    makeUserCreatedSubscriber(Logger, neo4jDriver),
    createConsumer(kafkaClient, 'social-networks-srv'),
    logger
  ),

  makeConsumerAdapter(
    new FollowedAUserEventSubscriber(),
    createConsumer(kafkaClient2, 'users-srv-follow-group'),
    logger
  ),
  makeConsumerAdapter(
    new UnFollowedAUserEventSubscriber(),
    createConsumer(kafkaClient2, 'users-srv-unfollow-group'),
    logger
  ),
  makeConsumerAdapter(
    new PostCreatedHandler(),
    createConsumer(kafkaClient2, 'users-srv-post-created'),
    logger
  ),
];
