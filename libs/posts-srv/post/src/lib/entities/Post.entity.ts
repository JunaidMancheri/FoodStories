import { ValidationError } from "@food-stories/common/errors";
import { ILogger } from "@food-stories/common/logger";
import { IPost } from "@food-stories/common/typings";
import { v4 as uuidV4 } from 'uuid';

export interface PostProps {
  id?: string;
  userId: string;
  caption: string;
  mediaUrls?: string[];
  createdAt?: number;
  likesCount?: number;
  commentsCount?: number;
}

export interface PostClass {
  new (postProps: PostProps): IPost;
}

export function makePostEntity(logger: ILogger): PostClass {
  return class implements IPost {
    public id: string;
    public userId: string;
    public caption: string;
    public mediaUrls: string[];
    public likesCount: number;
    public commentsCount: number;
    public createdAt: number;
    

    constructor(props: PostProps) {
      this.id = props.id || uuidV4()
      this.caption = props.caption || '';
      this.mediaUrls = props.mediaUrls || [];
      this.likesCount = props.likesCount || 0;
      this.commentsCount = props.commentsCount || 0;
      this.createdAt = props.createdAt || Date.now();

      if (!props.userId) throw new ValidationError('User id must be provided', logger)
      this.userId = props.userId
    }
  }
}