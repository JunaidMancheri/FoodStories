import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { NotificationsGateway } from './websocket.gateway';

@Injectable()
export class ApiGatewayNotificationsService implements OnModuleInit {

  async onModuleInit() {
    if (!process.env['KAFKA_URI']) throw new Error('KAFKA_URI is required');
    if (!process.env['KAFKA_USERNAME']) throw new Error('KAFKA_USERNAME is required');
  if (!process.env['KAFKA_PASSWORD']) throw new Error('KAFKA_PASSWORD is required');
    const kafkaClient = new Kafka({
       brokers: [process.env['KAFKA_URI']],
       clientId: 'api-gateway',
       connectionTimeout: 3000,
       ssl: {
        rejectUnauthorized: false
       },
       sasl: {
        mechanism: 'plain',
        username: process.env['KAFKA_USERNAME'],
        password:  process.env['KAFKA_PASSWORD'],
       }
          })

    const consumer = kafkaClient.consumer({groupId: 'api-gateway-group', allowAutoTopicCreation: false})
    await consumer.connect();
    await consumer.subscribe({topic: 'notifications', fromBeginning:  false});
    consumer.run({
      eachMessage: async ({message}) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const data = JSON.parse(message.value!.toString('utf8'))
         this.notifications.sendNotification(data.userId, data.message);
      }
    })
  }


  constructor(private notifications: NotificationsGateway) {}

  
}
