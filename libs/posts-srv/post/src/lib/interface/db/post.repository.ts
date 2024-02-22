import { Model } from "mongoose";
import { ICreatePostRepo } from "../../application/interfaces/repository/createPost.interface";
import { IPost } from "../../entities";
import { IPostDoc, postModel } from "./post.model";
import { IUpdateMediaUrlsRepo } from "../../application/interfaces/repository/updateMediaUrls.interface";
import { IUpdatePostMediaUrlsRequest } from "@food-stories/common/typings";

export class PostRepository 
implements ICreatePostRepo, IUpdateMediaUrlsRepo {

  constructor(private postModel: Model<IPostDoc>){}
  async createPost(postDto: IPost): Promise<void> {
      await this.postModel.create(postDto);
  }

   async updateMediaUrls(data: IUpdatePostMediaUrlsRequest): Promise<void> {
      await this.postModel.findByIdAndUpdate(data.postId, { mediaUrls: data.mediaUrls});
  }
}


export const postRepo = new PostRepository(postModel);