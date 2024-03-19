import {
  BaseHandler,
  RequestPayload,
  ResponsePayload,
  respondSuccess,
} from '@food-stories/common/handlers';
import { FollowOrUnollowAUserRequest } from '@food-stories/common/typings';
import { Driver } from 'neo4j-driver';

export class UnfollowAUserHandler extends BaseHandler {
  constructor(private driver: Driver) {
    super();
  }

  async execute(
    request: RequestPayload<FollowOrUnollowAUserRequest>
  ): Promise<ResponsePayload<void>> {
    const session = this.driver.session();
    await session.run(
      `
       MATCH (:User {userId: $followerId}) -[r:FOLLOWS]-> (:User {userId: $followeeId})
       DELETE r
       `,
      {
        followerId: request.data.followerId,
        followeeId: request.data.followeeId,
      }
    );
    session.close();
    return respondSuccess(null);
  }
}
