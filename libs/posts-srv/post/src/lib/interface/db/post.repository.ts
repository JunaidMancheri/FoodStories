import { Model } from "mongoose";
import { ICreatePostRepo } from "../../application/interfaces/repository/createPost.interface";
import { IPost } from "../../entities";
import { IPostDoc, postModel } from "./post.model";

export class PostRepository 
implements ICreatePostRepo {

  constructor(private postModel: Model<IPostDoc>){}
  async createPost(postDto: IPost): Promise<void> {
      await this.postModel.create(postDto);
  }
}


export const postRepo = new PostRepository(postModel);