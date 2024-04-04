import { ApiGatewayPostService } from '@food-stories/api-gateway/post';
import { ApiGatewaySocialNetworkService } from '@food-stories/api-gateway/social-network';
import { Controller, Get, Param } from '@nestjs/common';
import { exhaustMap, map, take } from 'rxjs';

@Controller('feeds')
export class ApiGatewayFeedController {
  constructor(
    private followService: ApiGatewaySocialNetworkService,
    private postService: ApiGatewayPostService
  ) {}

  @Get(':userId')
  async getFeed(@Param('userId') userId: string) {
    return this.followService.getFollowings({ userId }).pipe(
      take(1),
      exhaustMap((res) =>
        this.postService
          .getFeedsPosts({
            userIds: Array.isArray(res.users)
              ? [...res.users.map((user) => user.id), userId]
              : [userId],
          })
          .pipe(map((postRes) => ({ posts: postRes.posts, users: res.users })))
      )
    );
  }
}
