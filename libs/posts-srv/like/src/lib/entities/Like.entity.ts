import { ValidationError } from "@food-stories/common/errors";
import { ILogger } from "@food-stories/common/logger";
import { ILike, LikedEntity } from "@food-stories/common/typings";
import { v4 as uuidV4 } from 'uuid';

export interface LikeProps {
  id?: string;
  LikedEntity: LikedEntity
  likedOnId: string;
  likedBy: string;
  createdAt?: number;
}


export interface LikeClass {
  new (likeProps: LikeProps): ILike;
}

export  function makeLikeEntity(logger: ILogger): LikeClass {
  return class implements ILike {
    id: string;
    likedBy: string;
    likedEntity: LikedEntity;
    likedOnId: string;
    createdAt: number;


    constructor(props: LikeProps) {

      this.id = props.id  || uuidV4();
      this.createdAt = props.createdAt || Date.now();

      if (!props.LikedEntity) throw new ValidationError('Liked Entity must be specified', logger);
      this.likedEntity = props.LikedEntity

      if (!props.likedBy) throw new ValidationError('Liked By must be specified', logger);
      this.likedBy = props.likedBy;

      if (!props.likedOnId) throw new ValidationError('Liked On Id must be specified', logger);
      this.likedOnId = props.likedOnId;

    }
  }
}