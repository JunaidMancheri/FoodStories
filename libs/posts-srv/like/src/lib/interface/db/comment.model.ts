import { IComment } from "@food-stories/common/typings";
import { Document, Schema, model } from "mongoose";

export interface ICommentDoc extends Document {
  _id: string;
  comment: string
  commentedOn: string
  commentedBy: string
}



const commentSchema = new Schema({
  _id: String,
  comment: String,
  commentedBy: String,
  commentedOn: String,
  createdAt: Number,
})

export const CommentsModel = model<ICommentDoc>('comments', commentSchema);