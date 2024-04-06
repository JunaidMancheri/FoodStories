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
    const session = this.driver.session();
    const result = await session.run(
      `
    MATCH (:User {userId: $userId}) - [:FOLLOWS] -> (n) RETURN n;
    `,
      {
        userId: request.data.userId,
      }
    );
    return respondSuccess({
      users: result.records.map(
        (record) => {
          const prop = record.get('n').properties
          return { 
            id: prop.userId,
            DPURL: prop.DPURL,
            username: prop.username
          }
        }
      ),
    });
  }
}
