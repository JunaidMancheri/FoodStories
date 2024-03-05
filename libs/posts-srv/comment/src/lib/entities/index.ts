import { makeCommentEntity } from "./Comment.entity";
import { CommentsLogger } from '@food-stories/posts-srv/core';
import { CommentProps } from './Comment.entity';

const Comment = makeCommentEntity(new CommentsLogger('Entity: Comment'));

export { Comment, CommentProps}