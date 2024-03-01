import { IAddCommentRequest, IGetAllCommentsOnAPost, ILikeOrUnlikeAPostRequest, ILikesServiceClient } from "@food-stories/common/typings";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { TOKEN } from "./token";
import { ClientGrpc } from "@nestjs/microservices";
import { likesAppConfig } from "./confg";
import { handleGrpcError } from "@food-stories/api-gateway/common";

@Injectable()
export class ApiGatewayLikeService  implements OnModuleInit {
  private likesService!: ILikesServiceClient

  constructor(@Inject(TOKEN.LIKES_PACKAGE) private likesServiceClient: ClientGrpc) {}
  onModuleInit() {
      this.likesService = this.likesServiceClient.getService<ILikesServiceClient>(likesAppConfig.service_name);
  }


  likeAPost(data: ILikeOrUnlikeAPostRequest) {
    return handleGrpcError(this.likesService.likeAPost(data))
  }

  unLikeAPost(data: ILikeOrUnlikeAPostRequest) {
    return handleGrpcError(this.likesService.unlikeAPost(data));
  }

  isPostLiked(data: ILikeOrUnlikeAPostRequest) {
    return handleGrpcError(this.likesService.isPostLiked(data));
  }

  addAComment(data: IAddCommentRequest) {
    return handleGrpcError(this.likesService.addComment(data));
  }

  getAllComments(data: IGetAllCommentsOnAPost) {
    return  handleGrpcError(this.likesService.getAllCommentsOnAPost(data));
  }
}