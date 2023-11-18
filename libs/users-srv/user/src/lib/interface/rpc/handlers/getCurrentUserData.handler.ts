import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers";
import { IGetCurrentUserDataUseCase } from "../../../application/interfaces/usecases/getCurrentUserData.interface";
import { IgetCurrentUserDataRequest, IUser } from "@food-stories/common/typings";

export class GetCurrentUserDataHandler extends BaseHandler {

  constructor(private getUserDataUC: IGetCurrentUserDataUseCase) {
    super();
  }

  async execute(request: RequestPayload<IgetCurrentUserDataRequest>): Promise<ResponsePayload<IUser>> {
    const  user = await this.getUserDataUC.execute({ email: request.data.email});
    return respondSuccess(user)
  }

}