import { Controller } from '@nestjs/common';
import { ApiGatewayPostService } from './post.service';

@Controller('post')
export class ApiGatewayPostController {
  constructor(private apiGatewayPostService: ApiGatewayPostService) {}
}
