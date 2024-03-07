/* eslint-disable @typescript-eslint/no-empty-interface */
import { Observable } from "rxjs";
import { IComment } from "../interfaces/IComment.interface";
import { handleUnaryCall } from "@grpc/grpc-js";

export interface ICommentsServiceClient {
  addComment(request: IAddCommentRequest): Observable<IComment>;
  getCommentsForAPost(request: )
}

export interface ICommentsServiceServer {
  addComment: handleUnaryCall<IAddCommentRequest, IComment>;
}

export interface IGetCommentsForAPostRequest {
  postId: string;
  page: number;
}

export  interface IGetCommentsForAPostResponse {
  comments: IComment[],
  
}


export interface IAddCommentRequest extends Omit<IComment, 'id' | 'likesCount' | 'repliesCount' | 'createdAt'> {}