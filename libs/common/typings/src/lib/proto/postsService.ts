import { Metadata, handleUnaryCall } from "@grpc/grpc-js";
import { Observable } from "rxjs";
import { IPost } from "../interfaces/IPost.interface";

export interface IPostsServiceClient {
  createPost(request: ICreatePostRequest, metadata? : Metadata ) : Observable<IPost>;
  updatePostMediaUrls(request: IUpdatePostMediaUrlsRequest, metadata?: Metadata) :  Observable<void>
  getUsersPosts(request: IGetUsersPostsRequest, metadata?: Metadata) : Observable<IGetUsersPostsResponse>
}

export interface IPostsServiceServer {
   createPost: handleUnaryCall<ICreatePostRequest, IPost>;
   updatePostMediaUrls: handleUnaryCall<IUpdatePostMediaUrlsRequest, void>
   getUsersPosts: handleUnaryCall<IGetUsersPostsRequest, IGetUsersPostsResponse>;
}



export interface IGetUsersPostsResponse {
  posts: IPost[];
}

export interface IGetUsersPostsRequest {
  userId: string
}

export interface ICreatePostRequest {
  userId: string;
  caption?: string;
}

export interface IUpdatePostMediaUrlsRequest {
  postId: string
  thumbnailUrl: string
  mediaUrls: string[]
}