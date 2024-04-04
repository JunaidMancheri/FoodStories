import { ILogger } from '@food-stories/common/logger';
import { IUser, User, UserProps } from '../../entities';
import { ICreateUserUseCase } from '../interfaces/usecases/CreateUser.interface';
import { ICreateUserRepo } from '../interfaces/repository/createUser.interface';
import { REPO_ERRORS, RepositoryError } from '@food-stories/common/errors';
import { AlreadyExistsError } from '@food-stories/common/errors';
import { IUserCreatedEventPublisher } from '../../interface/pub-sub/publishers/UserCreated.publisher';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private logger: ILogger,
    private createUserRepo: ICreateUserRepo,
    private pubisher: IUserCreatedEventPublisher
  ) {}
  async execute(userDto: UserProps): Promise<IUser> {
    let newUser;
    try {
      newUser = new User(userDto);
      await this.createUserRepo.createUser(newUser);
    } catch (error) {
      if (
        error instanceof RepositoryError &&
        error.code == REPO_ERRORS.DUPLICATE_RECORD
      ) {
        throw new AlreadyExistsError('User already exists', this.logger);
      }
      throw error;
    }

    await this.pubisher.publish({ id: newUser.id, username: newUser.username, DPURL: newUser.DPURL });

    this.logger.info('new  user registered', {
      username: newUser.username,
      email: newUser.email,
    });

    return newUser;
  }
}
