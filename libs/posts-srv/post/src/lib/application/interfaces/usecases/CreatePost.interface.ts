import { IPost, PostProps } from "../../../entities";

export interface ICreatePostUsecase {
  execute(postDto: PostProps) : Promise<IPost>;
}