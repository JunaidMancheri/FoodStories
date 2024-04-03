import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiGatewaySocialNetworkService } from './social-network.service';

@Controller('social-networks')
export class ApiGatewaySocialNetworkController {
  constructor(
    private apiGatewaySocialNetworkService: ApiGatewaySocialNetworkService
  ) {}

  @Post('follow/:followeeId')
  followAUser(
    @Param('followeeId') followeeId: string,
    @Body() body: { followerId: string; followerUsername: string }
  ) {
    return this.apiGatewaySocialNetworkService.followAUser({
      followeeId,
      followerId: body.followerId,
      followerUsername: body.followerUsername,
    });
  }

  @Post('block/:targetId')
  blockUser(
    @Param('targetId') targetId: string,
    @Body() body: { blockerId: string }
  ) {
    return this.apiGatewaySocialNetworkService.blockUser({
      blockerId: body.blockerId,
      targetId,
    });
  }

  @Delete('block/:targetId')
  unblockUser(
    @Param('targetId') targetId: string,
    @Body() body: { blockerId: string }
  ) {
    return this.apiGatewaySocialNetworkService.unblockUser({
      blockerId: body.blockerId,
      targetId,
    });
  }

  @Delete('follow/:followeeId')
  unfollowAUser(
    @Param('followeeId') followeeId: string,
    @Body() Body: { followerId: string }
  ) {
    return this.apiGatewaySocialNetworkService.unfollowAUser({
      followeeId,
      followerId: Body.followerId,
    });
  }

  @Get('relationships/:followeeId')
  isFollowing(
    @Query('followerId') followerId: string,
    @Param('followeeId') followeeId: string
  ) {
    return this.apiGatewaySocialNetworkService.getRelationships({
      followeeId,
      followerId,
    });
  }
}
