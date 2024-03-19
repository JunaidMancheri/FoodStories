import { appConfig } from './app.config';
import { EVENTS } from '@food-stories/common/events';
import { Logger, logger } from '@food-stories/users-srv/core';
import { createKafkaClient } from '@food-stories/common/kafka';
import { makeConsumerAdapter, createConsumer } from '@food-stories/common/kafka';
import { makeUserCreatedSubscriber } from '@food-stories/users-srv/social-network';

export const kafkaClient = createKafkaClient(
  { clientId: 'users-srv', hostUrl: appConfig.KAFKA_URI },
  new Logger('KAFKA')
);

export const topicsNeeded = [EVENTS.User.Created.v1];

// consumers
makeConsumerAdapter(
  makeUserCreatedSubscriber(),
  createConsumer(kafkaClient, 'social-networks-srv'),
  logger
);
