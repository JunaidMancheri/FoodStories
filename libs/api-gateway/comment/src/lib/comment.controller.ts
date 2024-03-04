import { Controller } from '@nestjs/common';
import { ApiGatewayCommentService } from './comment.service';

@Controller('comment')
export class ApiGatewayCommentController {
  constructor(private apiGatewayCommentService: ApiGatewayCommentService) {}
}
