import { BaseHandler, BaseSubscriber, RequestPayload, ResponsePayload, respondSuccess } from '@food-stories/common/handlers';
import { postModel } from '../interface/db/post.model';
import { GetFeedsPostsHandler } from '../interface/handlers/GetFeedsPosts.handler';
import { GetChartValuesResponse } from '@food-stories/common/typings';

export * from './CreatePost.factory';
export * from './UpdateMediaUrls.factory';
export * from './GetUsersPosts.factory';

export function makeGetFeedsPostHandler() {
  return new GetFeedsPostsHandler();
}


export class GetChartValuesHandler extends BaseHandler {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(request: RequestPayload<void>): Promise<ResponsePayload<GetChartValuesResponse>> {
    const startOfPastYear = new Date();
    startOfPastYear.setFullYear(startOfPastYear.getFullYear() - 1);

      const results = await postModel.find({createdAt: {$gte: startOfPastYear}})
      const monthCounts = new Array(12).fill(0);

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      results.forEach(user => {
        const createdAt = new Date(user.createdAt);
        const monthIndex = (createdAt.getMonth() + 12 - currentMonth) % 12;
        monthCounts[monthIndex]++;
      });
      return respondSuccess({counts: monthCounts.reverse()})
  }
}

export class PostLikedHandler extends BaseSubscriber {
  async execute(payload: any): Promise<void> {
    await postModel.findByIdAndUpdate(payload.postId, {$inc: {likesCount: 1}})
  }
  event = 'Post.Liked'
  
} 


export class PostUnLikedHandler extends BaseSubscriber {
  async execute(payload: any): Promise<void> {
    await postModel.findByIdAndUpdate(payload.postId, {$inc: {likesCount: -1}})
  }
  event = 'Post.UnLiked'
  
} 