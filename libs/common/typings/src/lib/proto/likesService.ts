import { Metadata, handleUnaryCall } from "@grpc/grpc-js";
import { Observable } from "rxjs";


export interface ILikesServiceClient {
  likeAPost(request: ILikeOrUnlikeAPostRequest, metadata?: Metadata): Observable<void>;
  unlikeAPost(request:ILikeOrUnlikeAPostRequest , metadata?: Metadata): Observable<void>;
  isPostLiked(request: ILikeOrUnlikeAPostRequest, metadata?: Metadata): Observable<IIsPostLikedResponse>;


}

export interface ILikesServiceServer {
  likeAPost: handleUnaryCall<ILikeOrUnlikeAPostRequest, void>;
  unlikeAPost: handleUnaryCall<ILikeOrUnlikeAPostRequest, void>;
  isPostLiked: handleUnaryCall<ILikeOrUnlikeAPostRequest,IIsPostLikedResponse>
}



export  interface IIsPostLikedResponse {
  isLiked: boolean;
}


export interface ILikeOrUnlikeAPostRequest {
  userId: string
  postId: string
  postOwnerId?: string
  likedUserUsername?: string;
}