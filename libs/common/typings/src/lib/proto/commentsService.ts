/* eslint-disable @typescript-eslint/no-empty-interface */
import { Observable } from "rxjs";
import { IComment } from "../interfaces/IComment.interface";
import { handleUnaryCall } from "@grpc/grpc-js";

export interface ICommentsServiceClient {
  addComment(request: IAddCommentRequest): Observable<IComment>;
  // get comments form the  post;
}

export interface ICommentsServiceServer {
  addComment: handleUnaryCall<IAddCommentRequest, IComment>;
}


export interface IAddCommentRequest extends Omit<IComment, 'id' | 'likesCount' | 'repliesCount' | 'createdAt'> {}