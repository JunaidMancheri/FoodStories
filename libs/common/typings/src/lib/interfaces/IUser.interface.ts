export interface IUser {
  id: string;
  username: string;
  email: string;
  name: string ;
  isPrivate: boolean;
  createdAt: number;
  DPURL: string ;
  profile: Profile;
  postsCount: number;
  followersCount: number;
  followingsCount: number;
}


export interface Profile {
  bio: string | null;
  gender: 'male' | 'female' | 'preferNotToSay' | 'notMentioned';
}
