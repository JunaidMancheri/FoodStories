import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { NotificationsGateway } from './websocket.gateway';

@Injectable()
export class ApiGatewayNotificationsService implements OnModuleInit {

  async onModuleInit() {
    const kafkaClient = new Kafka({
       brokers: ['localhost:9092'],
       clientId: 'api-gateway',
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
