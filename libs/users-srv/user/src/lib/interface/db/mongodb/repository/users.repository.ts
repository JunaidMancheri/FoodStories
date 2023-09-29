import { Model } from "mongoose";
import { ICreateUserRepo } from "../../../../application/interfaces/repository/createUser.interface";
import { User } from "../../../../entities/User.entity";
import { IUser } from "../models/user.model";
import { IisUsernameAvailableRepo } from "../../../../application/interfaces/repository/isUsernameAvailable.interface";
import { IisRegisteredUserRepo } from "../../../../application/interfaces/repository/isRegisteredUser.interface";

export class UserRepository implements ICreateUserRepo, IisUsernameAvailableRepo, IisRegisteredUserRepo {
  constructor(private userModel: Model<IUser>) {}
  async isRegisteredUser(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return user ? true : false;
  }
  async isUsernameAvailable(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username }, 'username');
    return user ? false : true;
  }
  async createUser(user: User): Promise<void> {
    await this.userModel.create(user);
  }
  
}