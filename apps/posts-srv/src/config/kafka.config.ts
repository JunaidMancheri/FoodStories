import {
  createConsumer,
  createKafkaClient,
  makeConsumerAdapter,
} from '@food-stories/common/kafka';
import {
  PostLikedHandler,
  PostUnLikedHandler,
} from '@food-stories/posts-srv//post';
import { Logger, logger } from '@food-stories/posts-srv/core';
import { appConfig } from './app.config';

export const kafkaClientForPosts = createKafkaClient(
  {
    hostUrl: appConfig.KAFKA_URI,
    clientId: 'posts-srv',
    username: appConfig.KAFKA_USERNAME,
    password:  appConfig.KAFKA_PASSWORD
  },
  new Logger('Kafa')
);


export const kafkaClientForComments = createKafkaClient(
  {
    hostUrl: appConfig.KAFKA_URI,
    clientId: 'comments-srv',
    username: appConfig.KAFKA_USERNAME,
    password: appConfig.KAFKA_PASSWORD
  },
  new Logger('kafka')
)

export const topicsNeeded = ['Post.Created', 'Post.Liked', 'Post.UnLiked'];
export const consumers = [
  makeConsumerAdapter(
    new PostLikedHandler(),
    createConsumer(kafkaClientForPosts, 'pposts-srvlike'),
    logger
  ),
  makeConsumerAdapter(
    new PostUnLikedHandler(),
    createConsumer(kafkaClientForPosts, 'posts-unlie'),
    logger
  ),
];
