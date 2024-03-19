import {
  BaseHandler,
  RequestPayload,
  ResponsePayload,
  respondSuccess,
} from '@food-stories/common/handlers';
import { FollowOrUnollowAUserRequest } from '@food-stories/common/typings';
import { Driver } from 'neo4j-driver';

export class FollowAUserHandler extends BaseHandler {
  constructor(private driver: Driver) {
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
    return respondSuccess(null);
  }
}
