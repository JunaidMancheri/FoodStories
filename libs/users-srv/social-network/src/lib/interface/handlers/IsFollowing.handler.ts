import {
  BaseHandler,
  RequestPayload,
  ResponsePayload,
  respondSuccess,
} from '@food-stories/common/handlers';
import {
  FollowOrUnollowAUserRequest,
  IisFollowingResponse,
} from '@food-stories/common/typings';
import { Driver, Relationship } from 'neo4j-driver';

export class IsFollowingHandler extends BaseHandler {
  constructor(private driver: Driver) {
    super();
  }

  async execute(
    request: RequestPayload<FollowOrUnollowAUserRequest>
  ): Promise<ResponsePayload<IisFollowingResponse>> {
    const session = this.driver.session({
      database: 'foodstories.social.networks',
    });
    const { records } = await session.run(
      `
    MATCH (:User {userId: $followerId}) -[r]-> (:User {userId: $followeeId})
    RETURN r;
    `,
      {
        followerId: request.data.followerId,
        followeeId: request.data.followeeId,
      }
    );
    if (records.length > 0) {
      const relationship = records[0].get('r') as Relationship;
      if (relationship.type === 'BLOCKS')
        return respondSuccess({ isBlocked: true, isFollowing: false });
      if (relationship.type === 'FOLLOWS')
        return respondSuccess({ isFollowing: true, isBlocked: false });
    }
    return respondSuccess({ isFollowing: false, isBlocked: false });
  }
}
