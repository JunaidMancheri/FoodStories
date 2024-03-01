export  interface IPostLike {
  id: string;
  postId: string;
  userId: string;
  createdAt: number;
}

export interface ICommentLike {
  id: string;
  commentId: string;
  userId: string;
  createdAt: number;
}