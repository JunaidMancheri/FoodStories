import { ILogger } from '@food-stories/common/logger';
import { PostProps, IPost, Post } from '../../entities';
import { ICreatePostRepo } from '../interfaces/repository/createPost.interface';
import { ICreatePostUsecase } from '../interfaces/usecases/CreatePost.interface';

export class CreatePostUC implements ICreatePostUsecase {
  constructor(private repo: ICreatePostRepo, private logger: ILogger) {}
  async execute(postDto: PostProps): Promise<IPost> {
    const post = new Post(postDto);
    await this.repo.createPost(post);
    this.logger.info('Post created succesfully', {
      postId: post.id,
      userId: post.userId,
    });
    return post;
  }
}
