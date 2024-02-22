import { IPost, IUpdatePostMediaUrlsRequest } from "@food-stories/common/typings";

export interface IUpdateMediaUrlsUseCase {
  execute(data: IUpdatePostMediaUrlsRequest) : Promise<void>;
}