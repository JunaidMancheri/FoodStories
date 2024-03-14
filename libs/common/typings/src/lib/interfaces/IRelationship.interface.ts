export namespace SocialGraphEntities {
  export interface IBlockRelationship {
    userId: string;
    blockedUserId: string;
    createdAt: number;
  }

  export interface IUser {
    userId: string;
    username: string;
  }

  export interface IFollowRelationship {
    followerId: string;
    followeeId: string;
    createdAt: number;
  }
}
