import { IPost } from "../../../entities";

export interface IGetPostsByUserIdRepo {
  getPostsByUserId(userId: string): Promise<IPost[]>;
}