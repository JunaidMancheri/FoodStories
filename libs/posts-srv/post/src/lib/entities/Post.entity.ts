import { ValidationError } from "@food-stories/common/errors";
import { ILogger } from "@food-stories/common/logger";
import { IPost } from "@food-stories/common/typings";
import { v4 as uuidV4 } from 'uuid';

export interface PostProps extends Partial<IPost> {
  userId: string;
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
    public totalCommentsCount: number;
    public topLevelCommentsCount: number;
    public createdAt: number;
    public thumbnailUrl: string;
    

    constructor(props: PostProps) {
      this.id = props.id || uuidV4()
      this.caption = props.caption || '';
      this.mediaUrls = props.mediaUrls || [];
      this.thumbnailUrl = props.thumbnailUrl || '';
      this.likesCount = props.likesCount || 0;
      this.totalCommentsCount = props.totalCommentsCount || 0;
      this.topLevelCommentsCount = props.topLevelCommentsCount || 0;
      this.createdAt = props.createdAt || Date.now();

      if (!props.userId) throw new ValidationError('User id must be provided', logger)
      this.userId = props.userId
    }
  }
}