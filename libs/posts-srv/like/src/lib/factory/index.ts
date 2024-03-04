import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers";
import { IIsPostLikedResponse, ILikeOrUnlikeAPostRequest } from "@food-stories/common/typings";
import { PostLikeModel } from "../interface/db/like.model";
import { PostLike } from "../entities";




export function makeLikeAPostHandler() {
  return new LikeAPostHandler();
}

export  function makeUnLikeAPostHandler() {
  return new UnLikeAPostHandler();
}


export  function makeIsPostLikedHandler() {
  return new IsPostLikedHandler();
}




export class  LikeAPostHandler extends BaseHandler {

 async  execute(request: RequestPayload<ILikeOrUnlikeAPostRequest>): Promise<ResponsePayload<void>> {
     const like = new PostLike({userId: request.data.userId, postId: request.data.postId})
     await PostLikeModel.create(like);
     return respondSuccess(null);
  }

}


export  class UnLikeAPostHandler extends BaseHandler {
  async  execute(request: RequestPayload<ILikeOrUnlikeAPostRequest>): Promise<ResponsePayload<void>> {
    await PostLikeModel.findOneAndDelete({userId:  request.data.userId, postId: request.data.postId});
    return respondSuccess(null);

  }
  
}

export class IsPostLikedHandler extends BaseHandler {
  async  execute(request: RequestPayload<ILikeOrUnlikeAPostRequest>): Promise<ResponsePayload<IIsPostLikedResponse>> {
      const response = await PostLikeModel.findOne({userId: request.data.userId, postId: request.data.postId});
      console.log(request);
      if (response) {
        return respondSuccess({isLiked: true})
      }
      return respondSuccess({isLiked: false})
  }

}