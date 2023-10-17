import { Document, Model, Schema, model} from 'mongoose';


export interface IUser extends Document  {
  _id: string;
  name: string;
  username: string;
  email: string;
  isPrivate: boolean;
  createdAt: number;
  DPURL: string;
  profile: IProfile
}

interface IProfile {
  bio: string;
  gender: 'female' | 'male';
  links: string[];
}

const profile = new Schema({
  bio: String,
  gender: {
    enum: ['male', 'female'],
  },
  links: [String],
}, { _id: false})

const userSchema = new Schema<IUser, Model<IUser>>({
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
  profile: profile
})

const userModel = model<IUser>('users', userSchema);


export { userModel }