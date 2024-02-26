import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiGatewayLikeService } from './like.service';

@Controller('likes')
export class ApiGatewayLikeController {

  constructor(private likesService: ApiGatewayLikeService) {}
  @Post('/like/:postId')
  likeAPost(@Param('postId') postId: string, @Body() body: {userId: string}) {
    return  this.likesService.likeAPost({likedOnId: postId, userId:  body.userId})
  }

  @Post('/unlike/:postId')
  unlikeAPost(@Param('postId') postId: string, @Body() body: {userId: string}) {
    return  this.likesService.unLikeAPost({likedOnId: postId, userId:  body.userId})
  }

  @Get('/isLiked')
  isLiked(@Body() body: {userId: string, likedOnId: string}) {
    return this.likesService.isPostLiked({userId: body.userId, likedOnId: body.likedOnId});
  }
}
