import {
  BaseHandler,
  RequestPayload,
  ResponsePayload,
  respondSuccess,
} from '@food-stories/common/handlers';
import {
  IGetCommentsForAPostRequest,
  IGetCommentsForAPostResponse,
} from '@food-stories/common/typings';
import { commentsModel } from '../../infra/db/comment.model';
import { mapDocumentsToCommentEntities } from '../../infra/db/mapper.helper';

export class GetCommentsForAPostHandler extends BaseHandler {
  async execute(
    request: RequestPayload<IGetCommentsForAPostRequest>
  ): Promise<ResponsePayload<IGetCommentsForAPostResponse>> {
    const pageSize = request.data.pageSize;
    const skipValue = request.data.pageNumber * pageSize;
    const commentDocs = await commentsModel
      .find({ postId: request.data.postId })
      .skip(skipValue)
      .limit(pageSize);
    const comments = mapDocumentsToCommentEntities(commentDocs);
    return respondSuccess({ comments });
  }
}
