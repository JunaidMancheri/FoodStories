import { Metadata, handleUnaryCall } from "@grpc/grpc-js";
import { Observable } from "rxjs";
import { IPost } from "../interfaces/IPost.interface";

export interface IPostsServiceClient {
  createPost(request: ICreatePostRequest, metadata? : Metadata ) : Observable<IPost>;
}

export interface IPostsServiceServer {
   createUser: handleUnaryCall<ICreatePostRequest, IPost>;
}


export interface ICreatePostRequest {
  userId: string;
  caption: string;
}