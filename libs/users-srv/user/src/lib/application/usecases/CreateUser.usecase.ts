import { ILogger } from "@food-stories/common/logger";
import { User, UserProps } from "../../entities/User.entity";
import { ICreateUserUseCase } from "../interfaces/usecases/CreateUser.interface";
import { ICreateUserRepo } from "../interfaces/repository/createUser.interface";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private logger: ILogger,private createUserRepo: ICreateUserRepo) {}
  async execute(userDto: UserProps): Promise<User> {
    const newUser  = new User(userDto);
    await  this.createUserRepo.createUser(newUser);
    console.log('working usercase')
    this.logger.info('new  user registered', newUser);
    return newUser;
  }
  

}
