export interface IPost {
  id: string;
  userId: string;
  caption: string;
  mediaUrls: string[];
  createdAt: number;
  thumbnailUrl: string;
  likesCount: number;
  topLevelCommentsCount: number;
  totalCommentsCount: number;
}