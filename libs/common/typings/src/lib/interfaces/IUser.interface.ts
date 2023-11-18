export interface IUser {
  id: string;
  username: string;
  email: string;
  name: string | null;
  isPrivate: boolean;
  createdAt: number;
  DPURL: string | null;
  profile: Profile;
  postsCount: number;
  followersCount: number;
  followingsCount: number;
}


export interface Profile {
  bio?: string;
  gender?: 'male' | 'female';
  links?: string[];
}
