import { IUser } from "../../../entities";

export interface IgetUserDataByUsername {
  getUserDataByUsername(username: string): Promise<IUser | null>
}