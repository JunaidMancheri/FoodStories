import { BaseSubscriber } from '@food-stories/common/handlers';
import { EVENTS } from '@food-stories/common/events';
import { IUser } from '@food-stories/common/typings';
import { Driver } from 'neo4j-driver';
import { ILogger } from '@food-stories/common/logger';

export class UserCreatedEventSubscriber extends BaseSubscriber {
  event = EVENTS.User.Created.v1;

  constructor(private driver: Driver, private logger: ILogger) {
    super();
  }

  async execute(payload: Pick<IUser, 'id' | 'username' | 'DPURL'>): Promise<void> {
    const session = this.driver.session()
    await session.run('CREATE (u:User $userProps)', {
      userProps: { username: payload.username, userId: payload.id, DPURL: payload.DPURL },
    });
    session.close();
    this.logger.info('New user created successfully', {
      username: payload.username,
    });
  }
}
