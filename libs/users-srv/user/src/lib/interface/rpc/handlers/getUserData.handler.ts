import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers"
import { IUser, IgetUserDataRequest } from "@food-stories/common/typings";
import { IGetUserDataUseCase } from "../../../application/interfaces/usecases/getUserData.interface";

export class GetUserDataHandler extends BaseHandler {
  
  constructor(private uc: IGetUserDataUseCase) {
    super();
  }
 async execute(request: RequestPayload<IgetUserDataRequest>): Promise<ResponsePayload<IUser>> {
    const response = await this.uc.execute(request.data);
    return respondSuccess(response);
  }

}