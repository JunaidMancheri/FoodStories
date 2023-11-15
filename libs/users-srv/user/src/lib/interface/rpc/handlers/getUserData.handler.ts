import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers";
import { IgetUserDataUseCase } from "../../../application/interfaces/usecases/getUserData.interface";
import { IgetUserDataRequest, IgetUserDataResponse } from "@food-stories/common/typings";

export class GetUserDataHandler extends BaseHandler {

  constructor(private getUserDataUC: IgetUserDataUseCase) {
    super();
  }

  async execute(request: RequestPayload<IgetUserDataRequest>): Promise<ResponsePayload<IgetUserDataResponse>> {
    const  user = await this.getUserDataUC.execute({ email: request.data.email});
    return respondSuccess(user)
  }

}