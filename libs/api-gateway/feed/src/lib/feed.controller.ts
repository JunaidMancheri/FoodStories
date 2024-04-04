import { ApiGatewayLikeService } from '@food-stories/api-gateway/like';
import { ApiGatewayPostService } from '@food-stories/api-gateway/post';
import { ApiGatewaySocialNetworkService } from '@food-stories/api-gateway/social-network';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('feeds')
export class ApiGatewayFeedController {
  constructor(
    private followSerivce: ApiGatewaySocialNetworkService,
    private likeService: ApiGatewayLikeService,
    private postService: ApiGatewayPostService
  ) {}


  @Get(':userId')
  getFeed(@Param('userId') userId: string) {
    return this.followSerivce.getFollowings({userId})
  }


}
