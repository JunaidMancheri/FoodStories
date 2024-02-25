import {Document, Model, Schema, model} from 'mongoose';

export interface IPostDoc extends Document {
  _id: string;
  userId: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  createdAt: number;
  thumbnailUrl: string;
  mediaUrls: string[];
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
  commentsCount: Number,
  createdAt: Number,
  mediaUrls: [String]
})

const postModel = model<IPostDoc>('posts', postSchema);

export { postModel }