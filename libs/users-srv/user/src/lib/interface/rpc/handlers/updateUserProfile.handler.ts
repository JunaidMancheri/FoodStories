import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers";
import { IUpdateUserProfileUseCase } from "../../../application/interfaces/usecases/updateUserProfile.interface";
import { IUser } from "../../../entities";
import { EditProfileData } from "@food-stories/common/typings";

export class UpdateUserProfileHandler extends BaseHandler {
  async execute(request: RequestPayload<EditProfileData>): Promise<ResponsePayload<IUser>> {
    const user = await this.uc.execute(request.data);
    return respondSuccess(user);
  }
  constructor(private uc : IUpdateUserProfileUseCase) {
    super();
  }
}