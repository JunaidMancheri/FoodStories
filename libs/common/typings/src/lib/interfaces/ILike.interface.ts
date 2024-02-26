export  interface ILike {
  id: string;
  likedEntity: LikedEntity
  likedOnId: string;
  likedBy: string;
  createdAt: number;
}

export enum LikedEntity  {
   POST = "POST",
   COMMENT = "COMMENT",
   STORY = "STORY"
}