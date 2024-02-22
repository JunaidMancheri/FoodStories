import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ICreatePostRequest, IPostsServiceClient, IUpdatePostMediaUrlsRequest } from '@food-stories/common/typings';
import { TOKEN } from './token';
import { ClientGrpc } from '@nestjs/microservices';
import { PostsAppConfig } from './config';
import { handleGrpcError } from '@food-stories/api-gateway/common';

@Injectable()
export class ApiGatewayPostService implements OnModuleInit {
  private postsService!: IPostsServiceClient

  constructor(@Inject(TOKEN.POSTS_PACKAGE) private postsServiceClient: ClientGrpc) {}

  onModuleInit() {
    this.postsService =  this.postsServiceClient.getService<IPostsServiceClient>(PostsAppConfig.service_name);
  }

  createPost(createPostDto: ICreatePostRequest) {
    return handleGrpcError(this.postsService.createPost(createPostDto));
  }

  updatPostMediaUrls(data: IUpdatePostMediaUrlsRequest) {
    return  handleGrpcError(this.postsService.updatePostMediaUrls(data));
  }
}
