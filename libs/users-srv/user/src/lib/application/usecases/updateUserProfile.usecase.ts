import { EditProfileData } from "@food-stories/common/typings";
import { IUser } from "../../entities";
import { IUpdateUserProfileUseCase } from "../interfaces/usecases/updateUserProfile.interface";
import { IUpdateUserProfileRepo } from "../interfaces/repository/updateUserProfile.interface";
import { NotFoundError } from "@food-stories/common/errors";
import { ILogger } from "@food-stories/common/logger";

export class UpdateUserProfileUC implements IUpdateUserProfileUseCase {
  constructor(private repo: IUpdateUserProfileRepo, private logger: ILogger) {}
  async execute(request: EditProfileData): Promise<IUser> {
    const user = await this.repo.updateUserProfile(request);
    if (!user) throw new NotFoundError('user not found', this.logger);
    this.logger.info('user profile updated', user);
    return user;  
  }
  
}