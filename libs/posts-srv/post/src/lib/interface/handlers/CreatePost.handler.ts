import { BaseHandler, RequestPayload, ResponsePayload, respondSuccess } from '@food-stories/common/handlers'
import { ICreatePostRequest, IPost } from '@food-stories/common/typings';
import { ICreatePostUsecase } from '../../application/interfaces/usecases/CreatePost.interface';

export class CreatePostHandler extends BaseHandler {
  
  constructor(private uc: ICreatePostUsecase) {
    super();
  }
  async execute(request: RequestPayload<ICreatePostRequest>): Promise<ResponsePayload<IPost>> {
      const post = await this.uc.execute(request.data);
      return respondSuccess(post);
  }

}