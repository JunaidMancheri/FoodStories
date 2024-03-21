import { EVENTS } from '@food-stories/common/events';
import { IUser } from '../../../entities';
import { IUserCreatedEventPublisher } from '../../../interface/pub-sub/publishers/UserCreated.publisher';
import { Producer } from 'kafkajs';
import { ILogger } from '@food-stories/common/logger';

export class UserCreatedEventPublisher implements IUserCreatedEventPublisher {
  constructor(private producer: Producer, private logger: ILogger) {}
  async publish(user: IUser): Promise<void> {
    await this.producer.send({
      topic: EVENTS.User.Created.v1,
      messages: [{ value: JSON.stringify(user), key: user.id }],
    });

    this.logger.info(EVENTS.User.Created.v1 + ' event published');
  }
}
