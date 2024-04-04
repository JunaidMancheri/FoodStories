import { BaseSubscriber } from '@food-stories/common/handlers';
import { postModel } from '../interface/db/post.model';
import { GetFeedsPostsHandler } from '../interface/handlers/GetFeedsPosts.handler';

export * from './CreatePost.factory';
export * from './UpdateMediaUrls.factory';
export * from './GetUsersPosts.factory';

export function makeGetFeedsPostHandler() {
  return new GetFeedsPostsHandler();
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