import { Model, Schema, model } from "mongoose";
import { ILike } from "../../entities";

export interface ILikeDoc extends Document , ILike {
  _id: string;
}

const likeSchema = new Schema<ILikeDoc, Model<ILikeDoc>>({
  _id: {
    type: String,
    required: true,
  },
  likedBy: String,
  likedEntity: {
    enum : ['POST', "COMMENT", "STORY"],
  },
  likedOnId: String,
  createdAt: Number,
})


const likeModel = model<ILikeDoc>('likes', likeSchema);

export { likeModel };