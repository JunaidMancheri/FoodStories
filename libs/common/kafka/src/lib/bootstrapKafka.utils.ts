import { ILogger } from '@food-stories/common/logger';
import { Kafka } from 'kafkajs';

export async function bootstrapKafka(
  kafkaClient: Kafka,
  topicsNeeded: string[],
  logger: ILogger
) {
  const admin = kafkaClient.admin();
  await admin.connect();
  logger.info('Kafka Bootstraping...');
  const topics = await admin.listTopics();
  for (const topic of topicsNeeded) {
    if (!topics.includes(topic)) {
      logger.warn('cannot find topic ' + topic +  ' creating topic...');
    await admin.createTopics({
      topics: [
        {
          topic: topic,
          numPartitions: 4,
        },
      ],
    });
    logger.info('created topic with 4 partitions ' + topic);
    }

  }

  await admin.disconnect();
  logger.info('kafka bootstrap finished successfully');
}
