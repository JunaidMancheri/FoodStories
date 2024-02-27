import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiGatewayLikeService } from './like.service';
import { tap } from 'rxjs';

@Controller('likes')
export class ApiGatewayLikeController {

  constructor(private likesService: ApiGatewayLikeService) {}
  @Post('/:EntityId')
  likeAnEntity(@Param('EntityId') postId: string, @Body() body: {userId: string}) {
    return  this.likesService.likeAPost({likedOnId: postId, userId:  body.userId})
  }

  @Delete('/:EntityId')
  unlikeAnEntity(@Param('EntityId') postId: string, @Body() body: {userId: string}) {
    return  this.likesService.unLikeAPost({likedOnId: postId, userId:  body.userId})
  }

  @Get('/liked/:EntityId')
  isLiked(@Query() query: {userId: string}, @Param('EntityId') likedOnId: string) {
    return this.likesService.isPostLiked({userId: query.userId, likedOnId}).pipe(tap(res => console.log(res)));
  }
}
