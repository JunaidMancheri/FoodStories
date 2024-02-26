import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers";
import { IGetUsersPostsUseCase } from "../../application/interfaces/usecases/getUsersPosts.interface";
import { IGetUsersPostsRequest, IGetUsersPostsResponse } from "@food-stories/common/typings";

export class GetUsersPostsHandler extends BaseHandler {
  
  constructor(private uc: IGetUsersPostsUseCase) {
    super();
  }

  async execute(request: RequestPayload<IGetUsersPostsRequest>): Promise<ResponsePayload<IGetUsersPostsResponse>> {
    const posts = await this.uc.execute(request.data);
    return respondSuccess({posts});
  }
  
}