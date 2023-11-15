import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess,  } from '@food-stories/common/handlers'
import { ICreateUserUseCase } from '../../../application/interfaces/usecases/CreateUser.interface';
import { ICreateUserRequest, ICreateUserResponse } from '@food-stories/common/typings'


export class CreateUserHandler extends BaseHandler {
  constructor(private CreateUserUC: ICreateUserUseCase) {
    super();
  }
  async execute(request: Request): Promise<Response> {
    const newUser = await this.CreateUserUC.execute(request.data)
    return respondSuccess(newUser)
  }

}

type Request = RequestPayload<ICreateUserRequest>;
type Response = ResponsePayload<ICreateUserResponse>;