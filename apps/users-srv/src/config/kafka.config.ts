import {Kafka} from 'kafkajs';

export const kafkaClient = new Kafka({
  brokers: ['localhost:9092'],
  clientId: 'kafka-client',
})

export function createProducer(kafkaClient: Kafka) {
  const producer = kafkaClient.producer({allowAutoTopicCreation: false});
  producer.connect();
  process.on('SIGINT', async  () => await producer.disconnect());
  process.on('SIGTERM', async () => await producer.disconnect())
  return producer;
}




// export function kafkaConsumerAdapter(subscriber: at=n==) {
//   const consumer = kakfaClient.consumer({groupId: 'some-group', allowAutoTopicCreation: false});
//   consumer.connect();
//   consumer.subscribe({topic: 'some-topic', fromBeginning: true});
//   consumer.run({
//     autoCommit:  false,
//     eachMessage: async (payload) =>{

//        subscriber.handleEvent(payload.message.value.toJSON())
//     }
//   })
// }