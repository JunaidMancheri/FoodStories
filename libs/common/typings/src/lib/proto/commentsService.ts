/* eslint-disable @typescript-eslint/no-empty-interface */
import { Observable } from "rxjs";
import { IComment } from "../interfaces/IComment.interface";
import { handleUnaryCall } from "@grpc/grpc-js";

export interface ICommentsServiceClient {
  addComment(request: IAddCommentRequest): Observable<IComment>;
  getCommentsForAPost(request: IGetCommentsForAPostRequest ): Observable<IGetCommentsForAPostResponse>
}

export interface ICommentsServiceServer {
  addComment: handleUnaryCall<IAddCommentRequest, IComment>;
  getCommentsForAPost: handleUnaryCall<IGetCommentsForAPostRequest, IGetCommentsForAPostResponse>;
}

export interface IGetCommentsForAPostRequest {
  postId: string;
  pageNumber: number;
  pageSize: number;
}

export  interface IGetCommentsForAPostResponse {
  comments: IComment[],
}


export interface IAddCommentRequest extends Omit<IComment, 'id' | 'likesCount' | 'repliesCount' | 'createdAt'> {}