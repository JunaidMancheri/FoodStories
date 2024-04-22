/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata, handleUnaryCall } from "@grpc/grpc-js";
import { Observable } from "rxjs";
import { IPost } from "../interfaces/IPost.interface";
import { GetChartValuesResponse } from "./usersService";

export interface IPostsServiceClient {
  createPost(request: ICreatePostRequest, metadata? : Metadata ) : Observable<IPost>;
  updatePostMediaUrls(request: IUpdatePostMediaUrlsRequest, metadata?: Metadata) :  Observable<IPost>
  getUsersPosts(request: IGetUsersPostsRequest, metadata?: Metadata) : Observable<IGetUsersPostsResponse>
  getFeedsPosts(request: GetFeedsPostsRequest): Observable<GetFeedsPostsResponse>;
  getChartValues(request: any): Observable<GetChartValuesResponse>;
}

export interface IPostsServiceServer {
   createPost: handleUnaryCall<ICreatePostRequest, IPost>;
   updatePostMediaUrls: handleUnaryCall<IUpdatePostMediaUrlsRequest, IPost>
   getUsersPosts: handleUnaryCall<IGetUsersPostsRequest, IGetUsersPostsResponse>;
   getFeedsPosts: handleUnaryCall<GetFeedsPostsRequest, GetFeedsPostsResponse>;
   getChartValues: handleUnaryCall<void, GetChartValuesResponse>;
}



export interface GetFeedsPostsResponse {
  posts: IPost[]
}
export interface GetFeedsPostsRequest {
  userIds: string[];
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