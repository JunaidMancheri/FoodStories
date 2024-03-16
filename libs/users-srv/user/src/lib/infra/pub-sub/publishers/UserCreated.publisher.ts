import { IUser } from '../../../entities';
import { IUserCreatedEventPublisher } from '../../../interface/pub-sub/publishers/UserCreated.publisher';
import { Producer } from 'kafkajs';

export class UserCreatedEventPublisher implements IUserCreatedEventPublisher {
  constructor(private producer: Producer) {}
  async publish(user: IUser): Promise<void> {
    this.producer.send({
      topic: 'User:Created',
      messages: [{ value: JSON.stringify(user), key: user.id }],
    });
  }
}
