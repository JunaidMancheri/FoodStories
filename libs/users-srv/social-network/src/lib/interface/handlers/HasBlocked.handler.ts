import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers";
import { IHasBlockedRequest, IHasBlockedResponse } from "@food-stories/common/typings";
import { Driver, Relationship } from "neo4j-driver";

export class HasBlockedHandler extends BaseHandler {

  constructor(private driver: Driver) {
    super();
  }
  async execute(request: RequestPayload<IHasBlockedRequest>): Promise<ResponsePayload<IHasBlockedResponse>> {
    const session = this.driver.session({database: 'foodstories.social.networks'});
    const { records } = await session.run(
      `
    MATCH (:User {username: $blockerUsername}) -[r]-> (:User {userId: $targetUserId})
    RETURN r;
    `,
      {
        blockerUsername: request.data.blockerUsername,
        targetUserId: request.data.targetUserId,
      }
    );

    session.close();
    if (records.length > 0) {
      const relationship = records[0].get('r') as Relationship;
      if (relationship.type === 'BLOCKS')
        return respondSuccess({hasBlocked: true});
    }
    return respondSuccess({hasBlocked: false});
  }
  
}