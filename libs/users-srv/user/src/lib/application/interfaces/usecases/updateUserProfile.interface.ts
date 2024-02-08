import { EditProfileData, IUser } from "@food-stories/common/typings";

export interface IUpdateUserProfileUseCase {
  execute(request: EditProfileData): Promise<IUser>;
}