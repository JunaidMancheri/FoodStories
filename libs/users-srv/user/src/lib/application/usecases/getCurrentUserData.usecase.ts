import { ILogger } from '@food-stories/common/logger';
import { IUser } from '../../entities';
import { IgetUserDataByEmail } from '../interfaces/repository/getUserDataByEmail.interface';
import {
  IGetCurrentUserDataUseCase,
  GetCurrentUserDataNS,
} from '../interfaces/usecases/getCurrentUserData.interface';
import { NotFoundError } from '@food-stories/common/errors';

export class GetCurrentUserDataUC implements IGetCurrentUserDataUseCase {
  constructor(private userRepo: IgetUserDataByEmail, private logger: ILogger) {}

  async execute(request: GetCurrentUserDataNS.Request): Promise<IUser> {

    const user = await this.userRepo.getUserDataByEmail(request.email);

    if (user) return user;

    throw new NotFoundError(
      'User not found',
      this.logger,
      'No User record found for the email ' + request.email
    );

  }
}
