import { appConfig } from './app.config';
import { EVENTS } from '@food-stories/common/events';
import { Logger } from '@food-stories/users-srv/core';
import { createKafkaClient } from '@food-stories/common/kafka';

export const kafkaClient = createKafkaClient(
  { clientId: 'users-srv', hostUrl: appConfig.KAFKA_URI },
  new Logger('KAFKA')
);

export const topicsNeeded = [EVENTS.User.Created.v1];
