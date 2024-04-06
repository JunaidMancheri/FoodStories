import {
  BaseHandler,
  RequestPayload,
  ResponsePayload,
  respondSuccess,
} from '@food-stories/common/handlers';
import { IBlockUserRequest } from '@food-stories/common/typings';
import { Driver } from 'neo4j-driver';

export class UnblockUserHandler extends BaseHandler {
  constructor(private driver: Driver) {
    super();
  }

  async execute(
    request: RequestPayload<IBlockUserRequest>
  ): Promise<ResponsePayload<void>> {
    const session = this.driver.session();
    await session.run(
      `
      MATCH (:User {userId: $blockerId}) -[blocks:BLOCKS] ->(:User {userId: $targetId}) 
      delete blocks;
      `,
      {
        blockerId: request.data.blockerId,
        targetId: request.data.targetId,
      }
    );
    session.close();
    return respondSuccess(null);
  }
}
