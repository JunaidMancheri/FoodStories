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
import { Producer } from 'kafkajs';

export function initialize(Logger: LoggerClass, producer: Producer) {
  // const CommentLike = makeCommentLikeEntity(new Logger('Entity: CommentLike'));
  const PostLike = makePostLikeEntity(new Logger('Entity: PostLike'));

  function getRpcHandlers() {
    return {
      isPostLikedHandler: makeIsPostLikedHandler(),
      likeAPostHandler: makeLikeAPostHandler(PostLike, producer),
      unLikeAPostHandler: makeUnLikeAPostHandler(producer),
    };
  }

  return { getRpcHandlers };
}

function makeLikeAPostHandler(PostLike: PostLike, producer: Producer) {
  return new LikeAPostHandler(PostLike, producer);
}

function makeUnLikeAPostHandler(produer: Producer) {
  return new UnLikeAPostHandler(produer);
}

function makeIsPostLikedHandler() {
  return new IsPostLikedHandler();
}

class LikeAPostHandler extends BaseHandler {
  constructor(private PostLike: PostLike, private producer: Producer) {
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
    await this.producer.send({
      topic: 'Post.Liked',
      messages: [{ value: JSON.stringify({ postId: request.data.postId }) }],
    });

    if (like.userId !== request.data.postOwnerId) {
      await this.producer.send({
        topic: 'notifications',
        messages: [
          {
            value: JSON.stringify({
              message: `${request.data.likedUserUsername} liked your post`,
              userId: request.data.postOwnerId,
            }),
          },
        ],
      });
    }



    return respondSuccess(null);
  }
}

class UnLikeAPostHandler extends BaseHandler {
  constructor(private producer: Producer) {
    super();
  }
  async execute(
    request: RequestPayload<ILikeOrUnlikeAPostRequest>
  ): Promise<ResponsePayload<void>> {
    await PostLikeModel.findOneAndDelete({
      userId: request.data.userId,
      postId: request.data.postId,
    });
    await this.producer.send({
      topic: 'Post.UnLiked',
      messages: [{ value: JSON.stringify({ postId: request.data.postId }) }],
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
    if (response) {
      return respondSuccess({ isLiked: true });
    }
    return respondSuccess({ isLiked: false });
  }
}
