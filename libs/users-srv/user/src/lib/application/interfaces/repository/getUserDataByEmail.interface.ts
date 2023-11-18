import { IUser } from "../../../entities";

export interface IgetUserDataByEmail {
  getUserDataByEmail(email: string) : Promise<IUser | null>
}