import { Model } from 'mongoose';
import { ICreateUserRepo } from '../../../../application/interfaces/repository/createUser.interface';
import { IUserDoc, userModel } from '../models/user.model';
import { IisUsernameAvailableRepo } from '../../../../application/interfaces/repository/isUsernameAvailable.interface';
import { IisRegisteredUserRepo } from '../../../../application/interfaces/repository/isRegisteredUser.interface';
import { IgetUserDataRepo } from '../../../../application/interfaces/repository/getUserData.interface';
import { mapDocumentToUserEntity } from '../mapper.helper';
import { REPO_ERRORS, RepositoryError } from '@food-stories/common/errors/repository-errors/repository.error';
import { IUser } from '../../../../entities/User.entity';

export class UserRepository
  implements
    ICreateUserRepo,
    IisUsernameAvailableRepo,
    IisRegisteredUserRepo,
    IgetUserDataRepo
{
  constructor(private userModel: Model<IUserDoc>) {}

  async getUserData(email: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({ email });
    return mapDocumentToUserEntity(user);
  }

  async isRegisteredUser(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return user ? true : false;
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username }, 'username');
    return user ? false : true;
  }

  async createUser(user: IUser): Promise<void> {
    // use mapper  instead of relying on mongoose.
    try {
      await this.userModel.create(user);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any).code == 1100) {
        throw new RepositoryError(REPO_ERRORS.DUPLICATE_RECORD);
      } 
      throw error;
    }
  }
}

export const userRepo  = new  UserRepository(userModel);
