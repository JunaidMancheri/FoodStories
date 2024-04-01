import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers";
import { IUpdateMediaUrlsUseCase } from "../../application/interfaces/usecases/updateMediaUrls.interface";
import { IPost, IUpdatePostMediaUrlsRequest } from "@food-stories/common/typings";

export class UpdateMediaUrlsHandler extends BaseHandler {
  constructor(private uc : IUpdateMediaUrlsUseCase) {
    super();
  }

  async execute(request: RequestPayload<IUpdatePostMediaUrlsRequest>): Promise<ResponsePayload<IPost>> {
      const post = await this.uc.execute(request.data);
      return respondSuccess(post)
  }
}