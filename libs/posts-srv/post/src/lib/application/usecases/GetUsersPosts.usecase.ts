import { IGetUsersPostsRequest } from "@food-stories/common/typings";
import { IPost } from "../../entities";
import { IGetUsersPostsUseCase } from "../interfaces/usecases/getUsersPosts.interface";
import { IGetPostsByUserIdRepo } from "../interfaces/repository/getPostsByUserId.interface";

export class GetUsersPostsUc implements IGetUsersPostsUseCase {
  constructor(private repo: IGetPostsByUserIdRepo) {};
  async execute(data: IGetUsersPostsRequest): Promise<IPost[]> {
      const posts = await this.repo.getPostsByUserId(data.userId);
      return posts;
  }
}