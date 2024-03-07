export type IComment = {
  id: string;
  comment: string;
  userId: string;
  postId: string;
  likesCount: number;
  createdAt: number;
  repliesCount: number;
}


export type ICommentReply = {
  id: string;
  comment: string;
  userId: string;
  postId: string;
  likesCount: number;
  createdAt: number;
  rootCommentId: string;
  parentCommentId: string;
  repliedToUserId: string;
}