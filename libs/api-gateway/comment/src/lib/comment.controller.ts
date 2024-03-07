import { Controller } from '@nestjs/common';
import { ApiGatewayCommentService } from './comment.service';

@Controller('comments')
export class ApiGatewayCommentController {
  constructor(private apiGatewayCommentService: ApiGatewayCommentService) {}
}
