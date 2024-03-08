import { EditProfileData } from "@food-stories/common/typings";

export interface EditProfileDialogResult {
  dpFile: File | null;
  formData: EditProfileData
}
