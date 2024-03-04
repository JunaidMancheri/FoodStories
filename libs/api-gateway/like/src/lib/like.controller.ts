import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiGatewayLikeService } from './like.service';
import { tap } from 'rxjs';

@Controller('likes')
export class ApiGatewayLikeController {

  constructor(private likesService: ApiGatewayLikeService) {}
  @Post('/:postId')
  likeAPost(@Param('postId') postId: string, @Body() body: {userId: string}) {
    return  this.likesService.likeAPost({ postId, userId:  body.userId})
  }

  @Delete('/:postId')
  unlikeAPost(@Param('postId') postId: string, @Body() body: {userId: string}) {
    return  this.likesService.unLikeAPost({ postId, userId:  body.userId})
  }

  @Get('/liked/:postId')
  isPostLiked(@Query() query: {userId: string}, @Param('postId') postId: string) {
    return this.likesService.isPostLiked({userId: query.userId, postId}).pipe(tap(res => console.log(res)));
  }


}
