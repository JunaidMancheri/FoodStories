import { IGetUsersPostsRequest, IPost } from "@food-stories/common/typings";

export interface IGetUsersPostsUseCase {
  execute(data: IGetUsersPostsRequest) : Promise<IPost[]>
}