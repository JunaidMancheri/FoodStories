import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers";
import { Schema, model } from "mongoose";
import { FollowOrUnollowAUserRequest} from '@food-stories/common/typings';
import { v4 } from "uuid";

class FollowAUserHanlder extends BaseHandler {
  async execute(request: RequestPayload<FollowOrUnollowAUserRequest>): Promise<ResponsePayload<void>> {
      const newEntity = {
        id: v4(),
        followerId: request.data.followerId,
        followeeId: request.data.followeeId,
        createdAt: Date.now(),
      }
      await relationshipModel.create(newEntity);
      return respondSuccess(null);
  }
}

class UnfollowAUser extends BaseHandler {
  async execute(request: RequestPayload<FollowOrUnollowAUserRequest>): Promise<ResponsePayload<void>> {
    await relationshipModel.findOneAndDelete({followeeId: request.data.followeeId, followerId: request.data.followerId});
    return respondSuccess(null);
  }
}


export function makeFollowAUser() {
  return new FollowAUserHanlder();
}


export  function makeUnfollowAUser() {
  return new UnfollowAUser();
}



const relationShipSchema = new Schema({
  _id: String,
  followeeId: String,
  followerId: String,
  createdAt: Number,
})

const relationshipModel = model('relationships', relationShipSchema);