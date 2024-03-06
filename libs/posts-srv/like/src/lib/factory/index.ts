import {
  BaseHandler,
  RequestPayload,
  ResponsePayload,
  respondSuccess,
} from '@food-stories/common/handlers';
import {
  IIsPostLikedResponse,
  ILikeOrUnlikeAPostRequest,
} from '@food-stories/common/typings';
import { PostLikeModel } from '../interface/db/like.model';
import { LoggerClass } from '@food-stories/common/logger';
// import { makeCommentLikeEntity } from "../entities/CommentLike.entity";
import { PostLike, makePostLikeEntity } from '../entities/PostLike.entity';


export function initialize(Logger: LoggerClass) {
  // const CommentLike = makeCommentLikeEntity(new Logger('Entity: CommentLike'));
  const PostLike = makePostLikeEntity(new Logger('Entity: PostLike'));

  function getRpcHandlers() {
    return {
      isPostLikedHandler: makeIsPostLikedHandler(),
      likeAPostHandler: makeLikeAPostHandler(PostLike),
      unLikeAPostHandler: makeUnLikeAPostHandler(),
    };
  };

  return {getRpcHandlers}
}

function makeLikeAPostHandler(PostLike: PostLike) {
  return new LikeAPostHandler(PostLike);
}

function makeUnLikeAPostHandler() {
  return new UnLikeAPostHandler();
}

function makeIsPostLikedHandler() {
  return new IsPostLikedHandler();
}

class LikeAPostHandler extends BaseHandler {
  constructor(private PostLike: PostLike) {
    super();
  }

  async execute(
    request: RequestPayload<ILikeOrUnlikeAPostRequest>
  ): Promise<ResponsePayload<void>> {
    const like = new this.PostLike({
      userId: request.data.userId,
      postId: request.data.postId,
    });
    await PostLikeModel.create(like);
    return respondSuccess(null);
  }
}

class UnLikeAPostHandler extends BaseHandler {
  async execute(
    request: RequestPayload<ILikeOrUnlikeAPostRequest>
  ): Promise<ResponsePayload<void>> {
    await PostLikeModel.findOneAndDelete({
      userId: request.data.userId,
      postId: request.data.postId,
    });
    return respondSuccess(null);
  }
}
class IsPostLikedHandler extends BaseHandler {
  async execute(
    request: RequestPayload<ILikeOrUnlikeAPostRequest>
  ): Promise<ResponsePayload<IIsPostLikedResponse>> {
    const response = await PostLikeModel.findOne({
      userId: request.data.userId,
      postId: request.data.postId,
    });
    console.log(request);
    if (response) {
      return respondSuccess({ isLiked: true });
    }
    return respondSuccess({ isLiked: false });
  }
}
