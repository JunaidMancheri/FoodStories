import { appConfig } from './app.config';
import { EVENTS } from '@food-stories/common/events';
import { Logger, logger } from '@food-stories/users-srv/core';
import { createKafkaClient } from '@food-stories/common/kafka';
import { makeConsumerAdapter, createConsumer } from '@food-stories/common/kafka';
import { makeUserCreatedSubscriber } from '@food-stories/users-srv/social-network';
import { neo4jDriver } from './neo4j.config';

export const kafkaClient = createKafkaClient(
  { clientId: 'users-srv', hostUrl: appConfig.KAFKA_URI },
  new Logger('KAFKA')
);

export const topicsNeeded = [EVENTS.User.Created.v1, 'User.Updated.Privacy'];

// consumers
makeConsumerAdapter(
  makeUserCreatedSubscriber(Logger, neo4jDriver),
  createConsumer(kafkaClient, 'social-networks-srv'),
  logger
);
