import {
  BaseHandler,
  RequestPayload,
  ResponsePayload,
  respondSuccess,
} from '@food-stories/common/handlers';
import { FollowOrUnollowAUserRequest } from '@food-stories/common/typings';
import { Producer } from 'kafkajs';
import { Driver } from 'neo4j-driver';

export class UnfollowAUserHandler extends BaseHandler {
  constructor(private driver: Driver, private producer: Producer) {
    super();
  }

  async execute(
    request: RequestPayload<FollowOrUnollowAUserRequest>
  ): Promise<ResponsePayload<void>> {
    const session = this.driver.session();
    await session.run(
      `
       MATCH (n:User {userId: $followerId}) -[r:FOLLOWS]-> (j:User {userId: $followeeId})
       DELETE r;
       `,
      {
        followerId: request.data.followerId,
        followeeId: request.data.followeeId,
      }
    );
    session.close();
    await this.producer.send({
      topic: 'User.UnFollowed',
      messages: [{value: JSON.stringify({followerId: request.data.followerId, followeeId: request.data.followeeId})}]
    })
    return respondSuccess(null);
  }
}
