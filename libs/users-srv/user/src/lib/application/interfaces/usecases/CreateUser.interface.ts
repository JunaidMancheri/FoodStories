import { User, UserProps } from "../../../entities/User.entity";

export interface ICreateUserUseCase {
  execute(userDto: NSCreateUser.Request): Promise<NSCreateUser.Response>;
}

export namespace NSCreateUser {
  export type CreateUserDTO = UserProps
  export type Request = CreateUserDTO
  export type Response = User
}
