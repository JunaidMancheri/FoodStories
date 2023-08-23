import { ILogger } from "@food-stories/common/logger";
import { User, UserProps } from "../../entities/User.entity";
import { ICreateUserUseCase } from "../interfaces/usecases/CreateUser.interface";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private logger: ILogger) {}
  async execute(userDto: UserProps): Promise<User> {
    const newUser  = new User(userDto);
    this.logger.info('new  user registered', newUser);
    return newUser;
  }
  

}
