export interface IPost {
  id: string;
  userId: string;
  caption: string;
  mediaUrls: string[];
  createdAt: number;
  thumbnailUrl: string;
  likesCount: number;
  commentsCount: number;
}