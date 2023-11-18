import { ValidationError } from '@food-stories/common/errors';
import { ILogger } from '@food-stories/common/logger';
import { IUser, Profile } from '@food-stories/common/typings';
import { v4 as uuidV4 } from 'uuid';

export interface UserProps {
  username: string;
  email: string;
  id?: string;
  name?: string;
  DPURL?: string;
  isPrivate?: boolean;
  createdAt?: number;
  profile?: Profile;
  postsCount?: number;
  followersCount?: number;
  followingsCount?: number;
}

export interface UserClass {
  new (userprops: UserProps): IUser;
}

export function makeUserEntity(logger: ILogger): UserClass {
  return class implements IUser {
    public id: string;
    public name: string | null;
    public username: string;
    public email: string;
    public isPrivate: boolean;
    public createdAt: number;
    public DPURL: string | null;
    public profile: Profile;
    public postsCount: number;
    public followersCount: number;
    public followingsCount: number;

    constructor(props: UserProps) {
      this.id = props.id || uuidV4();
      this.isPrivate = props.isPrivate || false;
      this.createdAt = props.createdAt || Date.now();
      this.profile = props.profile || {};
      this.postsCount = props.postsCount || 0;
      this.followersCount = props.followersCount || 0;
      this.followingsCount = props.followingsCount || 0;

      if (!props.username) throw new ValidationError('Username must be provided', logger);
      if (!props.email) throw new ValidationError('Email must be provided', logger);

      this.username = props.username;
      this.email = props.email;

      this.name = props.name || null;
      this.DPURL = props.DPURL || null;
    }
  };
}
