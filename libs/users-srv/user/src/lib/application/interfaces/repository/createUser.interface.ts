import { User } from "../../../entities/User.entity";

export interface ICreateUserRepo {
  createUser(user: User): Promise<void>;
}