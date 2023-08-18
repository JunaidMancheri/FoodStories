import { BaseHandler, RequestPayload, ResponsePayload } from '@food-stories/common/handlers'

export class CreateUserHandler extends BaseHandler {
  async execute(request: RequestPayload<{name: string}>): Promise<ResponsePayload<{id: number, name: string}>> {
    return {status: 'success',  data: {id: 8, name: 'jithib henaid'}};
  }

}