import { IUser } from "../../../entities";

export interface IGetCurrentUserDataUseCase {
  execute(request: GetCurrentUserDataNS.Request): Promise<GetCurrentUserDataNS.Response>;
}

export namespace GetCurrentUserDataNS {
  export type Request = { email: string };
  export type Response = IUser;
}