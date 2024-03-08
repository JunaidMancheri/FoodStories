import { Model } from 'mongoose';
import { ICreateUserRepo } from '../../../application/interfaces/repository/createUser.interface';
import { IUserDoc, userModel } from './models/user.model';
import { IisUsernameAvailableRepo } from '../../../application/interfaces/repository/isUsernameAvailable.interface';
import { IisRegisteredUserRepo } from '../../../application/interfaces/repository/isRegisteredUser.interface';
import { IgetUserDataByEmail } from '../../../application/interfaces/repository/getUserDataByEmail.interface';
import { mapDocumentToUserEntity } from './mapper.helper';
import { REPO_ERRORS, RepositoryError } from '@food-stories/common/errors';
import { IUser } from '../../../entities';
import { IgetUserDataByUsername } from '../../../application/interfaces/repository/getUserDataByUsername.interface';
import { IUpdateUserProfileRepo } from '../../../application/interfaces/repository/updateUserProfile.interface';
import { EditProfileData } from '@food-stories/common/typings';

export class UserRepository
  implements
    ICreateUserRepo,
    IisUsernameAvailableRepo,
    IisRegisteredUserRepo,
    IgetUserDataByEmail,
    IgetUserDataByUsername,
    IUpdateUserProfileRepo
{
  constructor(private userModel: Model<IUserDoc>) {}
  async updateUserProfile(updates: EditProfileData): Promise<IUser | null> {
    const q = {
      username: updates.username,
      name: updates.name,
      DPURL  : updates.DPURL,
      profile: {
        bio: updates.bio,
        gender: updates.gender
      }
    }
    const user = await this.userModel.findByIdAndUpdate(updates.id, q, {new : true});
    return mapDocumentToUserEntity(user);
  }
  async getUserDataByUsername(username: string): Promise<IUser | null> {
    const user = await this.userModel.findOne( { username });
    return mapDocumentToUserEntity(user);
  }

  async getUserDataByEmail(email: string): Promise<IUser | null> {
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
