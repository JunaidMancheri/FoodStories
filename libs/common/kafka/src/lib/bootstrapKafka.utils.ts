import { ILogger } from '@food-stories/common/logger';
import { Kafka } from 'kafkajs';
import { ConsumerAdapter } from './makeConsumer.adapter';

export async function bootstrapKafka(
  kafkaClient: Kafka,
  topicsNeeded: string[],
  consumers: ConsumerAdapter[],
  logger: ILogger
) {
  const admin = kafkaClient.admin();
  await admin.connect();
  logger.info('Kafka Bootstraping...');
  const topics = await admin.listTopics();
  for (const topic of topicsNeeded) {
    if (!topics.includes(topic)) {
      logger.warn('cannot find topic ' + topic +  ' creating topic...');
      try {
        await admin.createTopics({
          topics: [
            {
              topic: topic,
              numPartitions: 4,
            },
          ],
        });
      } catch (error) {
        throw new Error('Can\'t create topics, do create manually')
      }

    logger.info('created topic with 4 partitions ' + topic);
    }

  }

  await admin.disconnect();
  logger.info('kafka bootstrap finished successfully');
  logger.info('Starting consumers...');
  consumers.forEach((consumer) =>consumer())
}
