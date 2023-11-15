import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers";
import { IisUsernameAvailableRequest, IisUsernameAvailableResponse } from "@food-stories/common/typings/proto/usersService";
import { IisUsernameAvailableUseCase } from "../../../application/interfaces/usecases/isUsernameAvailable.interface";


export class isUsernameAvailableHandler extends BaseHandler {

  constructor(private isUsernameAvailableUC: IisUsernameAvailableUseCase) {
    super()
  }

  async execute(request: Request): Promise<Response> {
    const response = await this.isUsernameAvailableUC.execute(request.data);
    return respondSuccess(response)
  }
  
}


type Request = RequestPayload<IisUsernameAvailableRequest>;
type Response = ResponsePayload<IisUsernameAvailableResponse>;