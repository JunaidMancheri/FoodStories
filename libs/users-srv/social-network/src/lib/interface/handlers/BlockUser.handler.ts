import {
  BaseHandler,
  RequestPayload,
  ResponsePayload,
  respondSuccess,
} from '@food-stories/common/handlers';
import { IBlockUserRequest } from '@food-stories/common/typings';
import { Producer } from 'kafkajs';
import { Driver } from 'neo4j-driver';

export class BlockUserHandler extends BaseHandler {
  constructor(private driver: Driver, private producer: Producer) {
    super();
  }

  async execute(
    request: RequestPayload<IBlockUserRequest>
  ): Promise<ResponsePayload<void>> {
    const session = this.driver.session({
      database: 'foodstories.social.networks',
    });

    const blockerFollowsResult = await session.run(
      `
    MATCH (:User {userId: $blockerId}) -[blockerFollows:FOLLOWS] ->(: User {userId: $targetId}) 
    delete blockerFollows
    return blockerFollows
    `,
      {
        blockerId: request.data.blockerId,
        targetId: request.data.targetId,
      }
    );

    if (blockerFollowsResult.records[0]) {
      await this.producer.send({
        topic: 'User.UnFollowed',
        messages: [
          {
            value: JSON.stringify({
              followerId: request.data.blockerId,
              followeeId: request.data.targetId,
            }),
          },
        ],
      });
    }
    const targetFollowsResult = await session.run(
      `
    MATCH (:User {userId: $targetId}) -[targetFollows:FOLLOWS] ->(:User {userId: $blockerId}) 
    delete targetFollows
    return targetFollows
    `,
      {
        blockerId: request.data.blockerId,
        targetId: request.data.targetId,
      }
    );


    if (targetFollowsResult.records[0]) {
      await this.producer.send({
        topic: 'User.UnFollowed',
        messages: [
          {
            value: JSON.stringify({
              followerId: request.data.targetId,
              followeeId: request.data.blockerId,
            }),
          },
        ],
      });
    }

    await session.run(
      `
     MATCH (n:User {userId: $blockerId}), (j: User {userId: $targetId})
     CREATE (n) -[:BLOCKS {createdAt: $createdAt}] -> (j)
     `,
     {
      blockerId: request.data.blockerId,
      targetId: request.data.targetId,
      createdAt: Date.now(),
    }
    );

    session.close()
    return respondSuccess(null);
  }
}
