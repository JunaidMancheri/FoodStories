import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers";
import { IIsPostLikedResponse, ILikeOrUnlikeAPostRequest, LikedEntity } from "@food-stories/common/typings";
import { likeModel } from "../interface/db/like.model";
import { Like } from "../entities";



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
     const like = new Like({likedBy: request.data.userId, likedOnId: request.data.likedOnId, LikedEntity: LikedEntity.POST})
     await likeModel.create(like);
     return respondSuccess(null);
  }

}


export  class UnLikeAPostHandler extends BaseHandler {
  async  execute(request: RequestPayload<ILikeOrUnlikeAPostRequest>): Promise<ResponsePayload<void>> {
    await likeModel.findOneAndDelete({likedBy:  request.data.userId, likedOnId: request.data.likedOnId});
    return respondSuccess(null);

  }
  
}

export class IsPostLikedHandler extends BaseHandler {
  async   execute(request: RequestPayload<ILikeOrUnlikeAPostRequest>): Promise<ResponsePayload<IIsPostLikedResponse>> {
      const response = await likeModel.findOne({likedBy: request.data.userId, likedOnId: request.data.likedOnId});
      if (response) {
        return respondSuccess({isLiked: true});
      }
      return respondSuccess({isLiked: false});
  }

}