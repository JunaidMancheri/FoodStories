import {
  BaseHandler,
  RequestPayload,
  ResponsePayload,
  respondSuccess,
} from '@food-stories/common/handlers';
import {
  GetFollowingsRequest,
  GetFollowingsResponse,
} from '@food-stories/common/typings';
import { Driver } from 'neo4j-driver';

export class GetFollowingsHandler extends BaseHandler {
  constructor(private driver: Driver) {
    super();
  }

  async execute(
    request: RequestPayload<GetFollowingsRequest>
  ): Promise<ResponsePayload<GetFollowingsResponse>> {
    const session = this.driver.session({
      database: 'foodstories.social.networks',
    });
    const result = await session.run(
      `
    MATCH (:User {userId: $userId}) - [:FOLLOWS] -> (n) RETURN n;
    `,
      {
        userId: request.data.userId,
      }
    );
    return respondSuccess({
      followingIds: result.records.map(
        (record) => record.get('n').properties.userId
      ),
    });
  }
}
