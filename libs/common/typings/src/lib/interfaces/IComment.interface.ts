export type IComment = {
  id: string;
  comment: string;
  userId: string;
  postId: string;
  likesCount: number;
  createdAt: number;
  rootCommentId?: string;
  parentCommentId?: string;
  repliesCount?: number;
  repliedToUserId?: string;
}