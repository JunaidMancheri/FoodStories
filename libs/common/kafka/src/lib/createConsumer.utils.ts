import { Kafka } from 'kafkajs';

export function createConsumer(kafkaClient: Kafka, groupId: string) {
  const consumer = kafkaClient.consumer({
    groupId,
    allowAutoTopicCreation: false,
    sessionTimeout: 40000,
    heartbeatInterval: 4000,
  });
  consumer.connect();
  process.on('SIGINT', async () => await consumer.disconnect());
  process.on('SIGTERM', async () => await consumer.disconnect());
  return consumer;
}
