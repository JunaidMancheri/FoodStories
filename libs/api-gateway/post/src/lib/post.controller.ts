import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiGatewayPostService } from './post.service';
import { IsNotEmpty } from 'class-validator';
import { AuthGuard } from '@food-stories/api-gateway/common';
import { map } from 'rxjs';

export class CreatePostDto {
  @IsNotEmpty()
  userId!: string;
  caption?: string;
}

@Controller('posts')
@UseGuards(AuthGuard)
export class ApiGatewayPostController {
  constructor(private apiGatewayPostService: ApiGatewayPostService) {}



  @Get('/user/:userId')
  getUsersPosts(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.apiGatewayPostService.getUsersPosts({userId}).pipe(map(data => data.posts))
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.apiGatewayPostService.createPost({
      userId: createPostDto.userId,
      caption: createPostDto.caption,
    });
  }

  @Put('/mediaUrls/:postId')
  updatePostMediaUrls(
    @Body() body: { mediaUrls: string[]; thumbnailUrl: string },
    @Param('postId') postId: string
  ) {
    return this.apiGatewayPostService.updatPostMediaUrls({
      postId,
      mediaUrls: body.mediaUrls,
      thumbnailUrl: body.thumbnailUrl,
    });
  }
}
