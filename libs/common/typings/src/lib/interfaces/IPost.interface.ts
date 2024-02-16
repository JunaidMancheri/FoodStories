export interface IPost {
  id: string;
  userId: string;
  caption: string;
  mediaUrls: string[];
  createdAt: number;
  likesCount: number;
  commentsCount: number;
}