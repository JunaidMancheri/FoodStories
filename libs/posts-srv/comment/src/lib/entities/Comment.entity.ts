import { ValidationError } from "@food-stories/common/errors";
import { ILogger } from "@food-stories/common/logger";
import { IComment } from "@food-stories/common/typings";
import { v4 } from "uuid";

export interface CommentProps extends Partial<IComment> {
  comment: string;
  userId: string;
  postId: string;
}

export interface CommentClass {
  new (props: CommentProps) : IComment;
}

export function makeCommentEntity(logger: ILogger): CommentClass {
  return class implements IComment {
    id: string;
    comment: string;
    userId: string;
    postId: string;
    rootCommentId?: string;
    parentCommentId?: string;
    likesCount: number;
    repliedToUserId?: string;
    repliesCount?: number;
    createdAt: number;

    constructor(props: CommentProps) {
      if (!props.comment) {
        throw new ValidationError('comment must be specified', logger);
      }

      if (!props.userId) {
        throw new ValidationError('userId must be specified', logger);
      }

      if (!props.postId) {
        throw new ValidationError('postId must be specified', logger);
      }



      this.id = props.id || v4()

      this.comment = props.comment;
      this.userId = props.userId;
      this.postId = props.postId;

      this.likesCount = props.likesCount || 0;
      this.createdAt = props.createdAt || Date.now();
      this.repliesCount = props.repliesCount || (props.parentCommentId ? undefined : 0)
      
      this.parentCommentId = props.parentCommentId;
      this.rootCommentId = props.rootCommentId;
      this.repliedToUserId = props.repliedToUserId;
    }
  }
}