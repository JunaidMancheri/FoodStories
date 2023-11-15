import { IUser } from "../../../entities";

export interface IgetUserDataRepo {
  getUserData(email: string) : Promise<IUser | null>
}