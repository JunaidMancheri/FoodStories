import { IUser } from "../../../entities";

export interface ICreateUserRepo {
  createUser(user: IUser): Promise<void>;
}