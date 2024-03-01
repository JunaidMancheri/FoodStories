import { Document, Model, Schema, model } from "mongoose";

export interface IPostLikeDoc extends Document {
  _id: string;
  postId: string;
  userId: string;
  createdAt: number;
}

const PostLikeSchema = new Schema<IPostLikeDoc, Model<IPostLikeDoc>>({
  _id: {
    type: String,
    required: true,
  },
  userId: String,
  postId: String,
  createdAt: Number,
})


const PostLikeModel = model<IPostLikeDoc>('post-likes', PostLikeSchema);

export { PostLikeModel };