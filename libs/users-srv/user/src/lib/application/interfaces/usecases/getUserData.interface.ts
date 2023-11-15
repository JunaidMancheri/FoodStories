import { IUser } from "../../../entities";

export interface IgetUserDataUseCase {
  execute(request: getUserDataNS.Request): Promise<getUserDataNS.Response>;
}

export namespace getUserDataNS {
  export type Request = { email: string };
  export type Response = IUser;
}