import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess,  } from '@food-stories/common/handlers'
import { ICreateUserUseCase } from '../../../application/interfaces/usecases/CreateUser.interface';
import { ILogger } from '@food-stories/common/logger';
// import { User, UserProps } from '../../../entities/User.entity';
import { ICreateUserRequest, ICreateUserResponse } from '@food-stories/common/typings/proto/usersService'


export class CreateUserHandler extends BaseHandler {
  constructor(private CreateUserUC: ICreateUserUseCase, logger: ILogger) {
    super(logger);
  }
  async execute(request: Request): Promise<Response> {
    const newUser = await this.CreateUserUC.execute(request.data)
    return  respondSuccess(newUser)

  }

}

type Request = RequestPayload<ICreateUserRequest>;
type Response = ResponsePayload<ICreateUserResponse>;