import {
  BaseHandler,
  RequestPayload,
  ResponsePayload,
  respondSuccess,
} from '@food-stories/common/handlers';
import { IAddCommentRequest, IComment } from '@food-stories/common/typings';
import { Comment, CommentProps } from '../../entities/Comment.entity';
import { commentsModel } from '../../infra/db/comment.model';
import { ILogger } from '@food-stories/common/logger';
import { Producer } from 'kafkajs';

export class AddCommentHandler extends BaseHandler {
  constructor(
    private Comment: Comment,
    private logger: ILogger,
    private producer: Producer
  ) {
    super();
  }

  async execute(
    request: RequestPayload<IAddCommentRequest>
  ): Promise<ResponsePayload<IComment>> {
    const commentProps: CommentProps = {
      comment: request.data.comment,
      postId: request.data.postId,
      userId: request.data.userId,
    };
    const newComment = new this.Comment(commentProps);

    await commentsModel.create(newComment);
    if (newComment.userId !== request.data.postOwnerId) {
      await this.producer.send({
        topic: 'notifications',
        messages: [
          {
            value: JSON.stringify({
              message: `${request.data.commentedUserUsername} commented ${newComment.comment} on your post`,
              userId: request.data.postOwnerId,
            }),
          },
        ],
      });
    }
    this.logger.info('New Comment added on the post ' + request.data.postId);

    return respondSuccess(newComment);
  }
}
