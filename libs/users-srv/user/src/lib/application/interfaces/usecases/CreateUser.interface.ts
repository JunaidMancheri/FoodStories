import { User, UserProps } from "../../../entities/User.entity";

export interface ICreateUserUseCase {
  execute(userDto: CreateUserNS.Request): Promise<CreateUserNS.Response>;
}

export namespace CreateUserNS {
  export type CreateUserDTO = UserProps
  export type Request = CreateUserDTO
  export type Response = User
}
