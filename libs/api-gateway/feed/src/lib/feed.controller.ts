import { ApiGatewayLikeService } from '@food-stories/api-gateway/like';
import { ApiGatewayPostService } from '@food-stories/api-gateway/post';
import { ApiGatewaySocialNetworkService } from '@food-stories/api-gateway/social-network';
import { Controller, Get, Param } from '@nestjs/common';
import {
  exhaustMap,
  take,
} from 'rxjs';

@Controller('feeds')
export class ApiGatewayFeedController {
  constructor(
    private followService: ApiGatewaySocialNetworkService,
    private likeService: ApiGatewayLikeService,
    private postService: ApiGatewayPostService
  ) {}

  @Get(':userId')
  async getFeed(@Param('userId') userId: string) {
    return this.followService.getFollowings({ userId }).pipe(
      take(1),
      exhaustMap((res) =>
        this.postService.getFeedsPosts({
          userIds: Array.isArray(res.followingIds) ? [...res.followingIds, userId]: [userId],
        })
      )
    );
  }
}
