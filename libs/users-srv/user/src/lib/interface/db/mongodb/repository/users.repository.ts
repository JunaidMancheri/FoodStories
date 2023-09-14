import { Model } from "mongoose";
import { ICreateUserRepo } from "../../../../application/interfaces/repository/createUser.interface";
import { User } from "../../../../entities/User.entity";
import { IUser } from "../models/user.model";

export class UserRepository implements ICreateUserRepo {
  constructor(private userModel: Model<IUser>) {}
  async createUser(user: User): Promise<void> {
    await this.userModel.create(user);
  }
  
}