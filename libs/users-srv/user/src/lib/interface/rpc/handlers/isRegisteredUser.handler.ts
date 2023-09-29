import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from "@food-stories/common/handlers";
import { IisRegisteredUserUseCase } from "../../../application/interfaces/usecases/isRegisteredUser.interface";
import { ILogger } from "@food-stories/common/logger";
import { IisRegisteredUserRequest, IisRegisteredUserResponse } from "@food-stories/common/typings/proto/usersService";

export class IsRegisteredUserHandler extends BaseHandler {
  async execute(request: Request): Promise<Response> {
    const response = await this.usecase.execute(request.data);
    return respondSuccess(response);
  }
  constructor(private usecase: IisRegisteredUserUseCase, logger: ILogger) {
    super(logger);
  }

}

type Request = RequestPayload<IisRegisteredUserRequest>;
type Response = ResponsePayload<IisRegisteredUserResponse>;