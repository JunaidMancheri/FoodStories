import { Model } from "mongoose";
import { ICreatePostRepo } from "../../application/interfaces/repository/createPost.interface";
import { IPost } from "../../entities";
import { IPostDoc, postModel } from "./post.model";
import { IUpdateMediaUrlsRepo } from "../../application/interfaces/repository/updateMediaUrls.interface";
import { IUpdatePostMediaUrlsRequest } from "@food-stories/common/typings";
import { IGetPostsByUserIdRepo } from "../../application/interfaces/repository/getPostsByUserId.interface";
import { mapDocumentToPostEntity, mapDocumentsToArrayOfPostEntities } from "./mapper.helper";

export class PostRepository 
implements ICreatePostRepo, IUpdateMediaUrlsRepo, IGetPostsByUserIdRepo {

  constructor(private postModel: Model<IPostDoc>){}
  async getPostsByUserId(userId: string): Promise<IPost[]> {
    const postDocs = await this.postModel.find({userId}).sort({createdAt: -1});
    return mapDocumentsToArrayOfPostEntities(postDocs);
  }
  async createPost(postDto: IPost): Promise<void> {
      await this.postModel.create(postDto);
  }

   async updateMediaUrls(data: IUpdatePostMediaUrlsRequest): Promise<IPost> {
      const postDoc = await this.postModel.findByIdAndUpdate(data.postId, { mediaUrls: data.mediaUrls, thumbnailUrl: data.thumbnailUrl}, {new: true});
      return mapDocumentToPostEntity(postDoc);
  }
}


export const postRepo = new PostRepository(postModel);