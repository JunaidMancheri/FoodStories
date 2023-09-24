import { Model } from "mongoose";
import { ICreateUserRepo } from "../../../../application/interfaces/repository/createUser.interface";
import { User } from "../../../../entities/User.entity";
import { IUser } from "../models/user.model";
import { IisUsernameAvailableRepo } from "../../../../application/interfaces/repository/isUsernameAvailable.interface";

export class UserRepository implements ICreateUserRepo, IisUsernameAvailableRepo {
  constructor(private userModel: Model<IUser>) {}
  async isUsernameAvailable(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username }, 'username');
    return user ? false : true;
  }
  async createUser(user: User): Promise<void> {
    await this.userModel.create(user);
  }
  
}