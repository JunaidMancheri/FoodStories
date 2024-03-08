import { IPost } from '@food-stories/common/typings';
import {Document, Model, Schema, model} from 'mongoose';

export interface IPostDoc extends Document, Omit<IPost, 'id'> {
  _id: string;
}


const postSchema = new Schema<IPostDoc, Model<IPostDoc>>({
  _id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  thumbnailUrl: String,
  caption: String,
  likesCount: Number,
  totalCommentsCount: Number,
  topLevelCommentsCount: Number,
  createdAt: Number,
  mediaUrls: [String]
})

const postModel = model<IPostDoc>('posts', postSchema);

export { postModel }