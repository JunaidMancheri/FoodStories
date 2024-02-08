import { Document, Model, Schema, model} from 'mongoose';


export interface IUserDoc extends Document  {
  _id: string;
  name: string;
  username: string;
  email: string;
  isPrivate: boolean;
  createdAt: number;
  DPURL: string;
  profile: IProfile;
  postsCount: number;
  followersCount: number;
  followingsCount: number;
}

interface IProfile {
  bio: string;
  gender: 'female' | 'male';
}

const profile = new Schema({
  bio: String,
  gender: {
    enum: ['male', 'female', 'preferNotToSay', 'notMentioned'],
    type: String,
    default: 'notMentioned',
  },
}, { _id: false})

const userSchema = new Schema<IUserDoc, Model<IUserDoc>>({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  isPrivate: {
    type: Boolean, 
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  DPURL: {
    type: String,
  },
  postsCount: {
    type: Number,
    default: 0,
  },
  followersCount: {
    type: Number,
    default: 0,
  },
  followingsCount: {
    type: Number,
    default: 0,
  },
  profile: profile
})

const userModel = model<IUserDoc>('users', userSchema);


export { userModel }