import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from '@food-stories/common/handlers';
import { FollowOrUnollowAUserRequest, IisFollowingResponse } from '@food-stories/common/typings';
import { Driver, Relationship } from 'neo4j-driver';

export class IsFollowingHandler extends BaseHandler {
  constructor(private driver: Driver) {
    super();
  }

  async execute(request: RequestPayload<FollowOrUnollowAUserRequest>): Promise<ResponsePayload<IisFollowingResponse>> {
    const session = this.driver.session({database: 'foodstories.social.networks'});
    const { records} = await session.run(`
    MATCH (:User {userId: $followerId}) -[r]-> (:User {userId: $followeeId})
    RETURN r;
    `, {followerId: request.data.followerId, followeeId: request.data.followeeId})
     if (records.length > 0) {
      const relationship = records[0].get('r');
      if ((relationship as Relationship).type === 'FOLLOWS')
      return respondSuccess({isFollowing: true});
     }
    return respondSuccess({isFollowing: false});
  }

}
