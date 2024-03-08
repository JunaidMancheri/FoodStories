import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiGatewayCommentService } from './comment.service';
import { IAddCommentRequest } from '@food-stories/common/typings';
import { map } from 'rxjs';

@Controller('comments')
export class ApiGatewayCommentController {
  constructor(private apiGatewayCommentService: ApiGatewayCommentService) {}

  @Get('/:postId')
  getCommentsForAPost(@Param('postId') postId: string) {
    return this.apiGatewayCommentService.getCommentsForAPost({
      postId,
      pageNumber: 1,
      pageSize: 15,
    }).pipe(map(val => val.comments ? val : {comments: []}));
  }

  @Post('/:postId')
  addComment(
    @Param('postId') postId: string,
    @Body() body: Omit<IAddCommentRequest, 'postId'>
  ) {
    return this.apiGatewayCommentService.addComment({
      postId,
      comment: body.comment,
      userId: body.userId,
    });
  }
}
