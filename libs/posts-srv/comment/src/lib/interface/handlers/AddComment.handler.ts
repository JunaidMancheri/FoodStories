import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers";
import  { IAddCommentRequest, IComment } from '@food-stories/common/typings';
import { Comment, CommentProps } from "../../entities/Comment.entity";
import { commentsModel } from "../../infra/db/comment.model";
import { ILogger } from "@food-stories/common/logger";

export class AddCommentHandler  extends BaseHandler {
  constructor(private Comment: Comment, private logger: ILogger) {
    super();
  }

  async execute(request: RequestPayload<IAddCommentRequest>): Promise<ResponsePayload<IComment>> {

      const commentProps: CommentProps = {
        comment: request.data.comment,
        postId:  request.data.postId,
        userId: request.data.userId,
      }
      const newComment = new this.Comment(commentProps);

      await commentsModel.create(newComment);
      this.logger.info('New Comment added on the post ' + request.data.postId);

      return respondSuccess(newComment);
  }

}