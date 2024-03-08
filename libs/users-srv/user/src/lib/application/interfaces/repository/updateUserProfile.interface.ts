import { EditProfileData, IUser } from "@food-stories/common/typings";

export interface IUpdateUserProfileRepo {
  updateUserProfile(updates: EditProfileData ): Promise<IUser | null>;
}