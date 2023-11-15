import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers";
import { IisRegisteredUserUseCase } from "../../../application/interfaces/usecases/isRegisteredUser.interface";
import { IisRegisteredUserRequest, IisRegisteredUserResponse } from "@food-stories/common/typings";

export class IsRegisteredUserHandler extends BaseHandler {

  constructor(private usecase: IisRegisteredUserUseCase) {
    super();
  }

  async execute(request: Request): Promise<Response> {
    const response = await this.usecase.execute(request.data);
    return respondSuccess(response);
  }


}

type Request = RequestPayload<IisRegisteredUserRequest>;
type Response = ResponsePayload<IisRegisteredUserResponse>;