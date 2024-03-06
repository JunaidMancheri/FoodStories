import { ValidationError } from '@food-stories/common/errors';
import { ILogger } from '@food-stories/common/logger';
import { IPostLike } from '@food-stories/common/typings';
import { v4 as uuidV4 } from 'uuid';

export interface PostLikeProps extends Partial<IPostLike> {
  userId: string;
  postId: string;
}

export interface PostLikeClass {
  new (postLikeProps: PostLikeProps): IPostLike;
}

export function makePostLikeEntity(logger: ILogger): PostLikeClass {
  logger.info('kana  kuna')
  return class implements IPostLike {
    id: string;
    userId: string;
    postId: string;
    createdAt: number;

    constructor(props: PostLikeProps) {
      this.id = props.id || uuidV4();
      this.createdAt = props.createdAt || Date.now();

      if (!props.userId)
        throw new ValidationError('userId must be specified', logger);
      this.userId = props.userId;

      if (!props.postId)
        throw new ValidationError('postId must be specified', logger);
      this.postId = props.postId;
    }
  };
}
