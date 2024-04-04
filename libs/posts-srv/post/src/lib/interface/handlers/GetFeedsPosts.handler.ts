import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers";
import { GetFeedsPostsRequest, GetFeedsPostsResponse } from "@food-stories/common/typings";
import { postModel } from "../db/post.model";
import { mapDocumentsToArrayOfPostEntities } from "../db/mapper.helper";

export class GetFeedsPostsHandler extends BaseHandler {
  async execute(request: RequestPayload<GetFeedsPostsRequest>): Promise<ResponsePayload<GetFeedsPostsResponse>> {
    const posts = await postModel.find({userId: { $in: request.data.userIds}}).sort({createdAt: -1});
    return respondSuccess({posts: mapDocumentsToArrayOfPostEntities(posts)});
  }
}