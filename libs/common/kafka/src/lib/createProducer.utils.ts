import { Kafka } from "kafkajs";

export function createProducer(kafkaClient: Kafka) {
  const producer = kafkaClient.producer({ allowAutoTopicCreation: false});
  (async () => await producer.connect())();
  process.on('SIGINT', async () => await producer.disconnect());
  process.on('SIGTERM', async () => await producer.disconnect());
  return producer;
}

