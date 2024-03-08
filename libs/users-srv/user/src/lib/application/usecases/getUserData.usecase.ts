import { NotFoundError } from '@food-stories/common/errors';
import { IUser } from '../../entities';
import { IgetUserDataByUsername } from '../interfaces/repository/getUserDataByUsername.interface';
import { IGetUserDataUseCase } from '../interfaces/usecases/getUserData.interface';
import { ILogger } from '@food-stories/common/logger';

export class GetUserDataUC implements IGetUserDataUseCase {
  constructor(
    private userRepo: IgetUserDataByUsername,
    private logger: ILogger
  ) {}
  async execute(data: { username: string }): Promise<IUser> {
    const user = await this.userRepo.getUserDataByUsername(data.username);
    if (user) return user;

    throw new NotFoundError(
      'User not found with the username ' + data.username,
      this.logger
    );
  }
}
