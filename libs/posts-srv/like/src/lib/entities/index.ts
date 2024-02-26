import { Logger } from "@food-stories/posts-srv/core";
import { makeLikeEntity, LikeProps } from "./Like.entity";
import { ILike } from "@food-stories/common/typings";

const Like  = makeLikeEntity(new Logger('Entity: Like'));
export { Like, LikeProps, ILike}