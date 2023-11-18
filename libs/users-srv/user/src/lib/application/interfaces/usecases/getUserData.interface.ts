import { IUser } from "../../../entities";

export interface IGetUserDataUseCase {
  execute(data: {username: string}): Promise<IUser>
}