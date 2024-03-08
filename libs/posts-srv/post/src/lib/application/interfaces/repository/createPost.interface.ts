import { IPost } from "../../../entities";

export interface ICreatePostRepo {
  createPost(postDto: IPost): Promise<void>;
}