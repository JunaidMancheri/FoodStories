import {
  BaseHandler,
  RequestPayload,
  ResponsePayload,
  respondSuccess,
} from '@food-stories/common/handlers';
import { FollowOrUnollowAUserRequest } from '@food-stories/common/typings';
import { Producer } from 'kafkajs';
import { Driver } from 'neo4j-driver';

export class FollowAUserHandler extends BaseHandler {
  constructor(private driver: Driver, private producer: Producer) {
    super();
  }

  async execute(
    request: RequestPayload<FollowOrUnollowAUserRequest>
  ): Promise<ResponsePayload<void>> {
    const session = this.driver.session({
      database: 'foodstories.social.networks',
    });
    await session.run(
      `
     MATCH (n:User {userId: $followerId}), (j: User {userId: $followeeId})
     CREATE (n) -[:FOLLOWS {createdAt: $createdAt}] -> (j)
     `,
      {
        followerId: request.data.followerId,
        followeeId: request.data.followeeId,
        createdAt: Date.now(),
      }
    );
    session.close();
    await this.producer.send({
      topic: 'User.Followed',
      messages: [
        {
          value: JSON.stringify({
            followerId: request.data.followerId,
            followeeId: request.data.followeeId,
          }),
        },
      ],
    });


    await this.producer.send({
      topic: 'notifications',
      messages: [
        {
          value: JSON.stringify({
            message: `${request.data.followerUsername} started following you`,
            userId: request.data.followeeId,
          }),
        },
      ],
    });
    return respondSuccess(null);
  }
}
