import { ValidationError } from "@food-stories/common/errors";
import { ILogger } from "@food-stories/common/logger";
import { ICommentLike } from "@food-stories/common/typings";
import { v4 } from "uuid";

export interface CommentLIkeProps extends Partial<ICommentLike> {
  commentId: string;
  userId: string;
}

export interface CommentLIke {
  new (commentLikeProps: CommentLIkeProps) : ICommentLike;
}


export  function makeCommentLikeEntity(logger: ILogger) : CommentLIke {
  return class implements ICommentLike {
    id: string;
    userId: string;
    commentId: string;
    createdAt: number;

    constructor(props: CommentLIkeProps) {
      this.id = props.id || v4();
      this.createdAt = props.createdAt || Date.now();

      if (!props.commentId) {
        throw new ValidationError('commentId must be provided', logger);
      }
      this.commentId = props.commentId;

      if (!props.userId)
        throw new ValidationError('userId must be provided', logger);
      this.userId = props.userId;


    }
  }
}