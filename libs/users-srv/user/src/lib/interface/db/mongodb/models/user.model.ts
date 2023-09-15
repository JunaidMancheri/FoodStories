import { Document, Model, Schema, model} from 'mongoose';


export interface IUser extends Document  {
  _id: string;
  name: string;
  userName: string;
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
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
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

const userModel = model<IUser>('users-srv/users', userSchema);


export { userModel }