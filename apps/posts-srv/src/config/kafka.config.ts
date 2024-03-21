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

export const kafkaClientForPosts = createKafkaClient(
  {
    hostUrl: 'localhost:9092',
    clientId: 'posts-srv',
  },
  new Logger('Kafa')
);

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
