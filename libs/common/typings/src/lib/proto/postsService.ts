import { Metadata, handleUnaryCall } from "@grpc/grpc-js";
import { Observable } from "rxjs";
import { IPost } from "../interfaces/IPost.interface";

export interface IPostsServiceClient {
  createPost(request: ICreatePostRequest, metadata? : Metadata ) : Observable<IPost>;
  updatePostMediaUrls(request: IUpdatePostMediaUrlsRequest, metadata?: Metadata) :  Observable<void>
}

export interface IPostsServiceServer {
   createPost: handleUnaryCall<ICreatePostRequest, IPost>;
   updatePostMediaUrls: handleUnaryCall<IUpdatePostMediaUrlsRequest, void>
}


export interface ICreatePostRequest {
  userId: string;
  caption?: string;
}

export interface IUpdatePostMediaUrlsRequest {
  postId: string
  mediaUrls: string[]
}