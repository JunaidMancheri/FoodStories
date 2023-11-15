import { ILogger } from '@food-stories/common/logger';
import { IUser } from '../../entities/User.entity';
import { IgetUserDataRepo } from '../interfaces/repository/getUserData.interface';
import {
  IgetUserDataUseCase,
  getUserDataNS,
} from '../interfaces/usecases/getUserData.interface';
import { NotFoundError } from '@food-stories/common/errors';

export class GetUserDataUC implements IgetUserDataUseCase {
  constructor(private userRepo: IgetUserDataRepo, private logger: ILogger) {}

  async execute(request: getUserDataNS.Request): Promise<IUser> {

    const user = await this.userRepo.getUserData(request.email);

    if (user) return user;

    throw new NotFoundError(
      'User not found',
      this.logger,
      'No User record found for the email ' + request.email
    );

  }
}
