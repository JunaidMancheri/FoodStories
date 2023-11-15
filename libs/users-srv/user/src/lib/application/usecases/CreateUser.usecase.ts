import { ILogger } from "@food-stories/common/logger";
import { IUser, User, UserProps } from "../../entities";
import { ICreateUserUseCase } from "../interfaces/usecases/CreateUser.interface";
import { ICreateUserRepo } from "../interfaces/repository/createUser.interface";
import { REPO_ERRORS, RepositoryError } from "@food-stories/common/errors/repository-errors/repository.error";
import { AlreadyExistsError } from '@food-stories/common/errors/application-errors/AlreadyExists.error';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private logger: ILogger,private createUserRepo: ICreateUserRepo) {}
  async execute(userDto: UserProps): Promise<IUser> {
   
    const  newUser = new User(userDto)
    try {
      await  this.createUserRepo.createUser(newUser);
    } catch (error) {
      if (error instanceof RepositoryError && error.code == REPO_ERRORS.DUPLICATE_RECORD) {
        throw new AlreadyExistsError('User already exists', this.logger);
      }
      throw error;
    }

    this.logger.info('new  user registered', { username: newUser.username, email: newUser.email});
    return newUser;
  }
  

}
