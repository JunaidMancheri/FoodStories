import { IComment } from "@food-stories/common/typings";
import { Document, Model, Schema, model } from 'mongoose';
export interface ICommentDoc extends Omit<IComment, 'id'>, Document {
  _id: string;
}

const commentSchema = new Schema<ICommentDoc, Model<ICommentDoc>>({
  _id: String,
  comment: {
    type: String, 
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  parentCommentId: String,
  rootCommentId: String,
  repliedToUserId: String,
  repliesCount: Number,
  likesCount: {
    type: Number,
    required: true,
    defaul: 0,
  },
  createdAt: {
    type: Number,
    required: true,
  }
})


const commentsModel = model('comments', commentSchema);

export { commentsModel };
