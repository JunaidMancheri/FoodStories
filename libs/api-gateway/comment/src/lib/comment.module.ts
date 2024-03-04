import { Module } from '@nestjs/common';
import { ApiGatewayCommentController } from './comment.controller';
import { ApiGatewayCommentService } from './comment.service';

@Module({
  controllers: [ApiGatewayCommentController],
  providers: [ApiGatewayCommentService],
  exports: [ApiGatewayCommentService],
})
export class ApiGatewayCommentModule {}
