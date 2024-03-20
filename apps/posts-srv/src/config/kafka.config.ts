import { createConsumer, createKafkaClient } from "@food-stories/common/kafka";
import { logger } from "@food-stories/posts-srv/core";

export const  kafkaClientForPosts = createKafkaClient({
  hostUrl: 'localhost:9092',
  clientId: 'posts-srv',
}, logger)


