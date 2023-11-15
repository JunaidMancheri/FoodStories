import { IUser, UserProps } from "../../../entities";

export interface ICreateUserUseCase {
  execute(userDto: CreateUserNS.Request): Promise<CreateUserNS.Response>;
}

export namespace CreateUserNS {
  export type CreateUserDTO = UserProps
  export type Request = CreateUserDTO
  export type Response = IUser
}
