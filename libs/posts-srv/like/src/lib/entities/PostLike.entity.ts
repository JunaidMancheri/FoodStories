import { ValidationError } from '@food-stories/common/errors';
import { ILogger } from '@food-stories/common/logger';
import { IPostLike } from '@food-stories/common/typings';
import { v4 as uuidV4 } from 'uuid';

export interface PostLikeProps extends Partial<IPostLike> {
  userId: string;
  postId: string;
}

export interface PostLike {
  new (postLikeProps: PostLikeProps): IPostLike;
}

export function makePostLikeEntity(logger: ILogger): PostLike {
  return class implements IPostLike {
    id: string;
    userId: string;
    postId: string;
    createdAt: number;

    constructor(props: PostLikeProps) {

      this.validate(props);

      this.id = props.id || uuidV4();
      this.createdAt = props.createdAt || Date.now();
      this.userId = props.userId;
      this.postId = props.postId;
    }

    private validate(props: PostLikeProps) {
      if (!props.userId)
        throw new ValidationError('userId must be specified', logger);

      if (!props.postId)
        throw new ValidationError('postId must be specified', logger);
    }
  };
}
