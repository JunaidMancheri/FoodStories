import { Controller } from '@nestjs/common';
import { ApiGatewayAuthService } from './auth.service';

@Controller('auth')
export class ApiGatewayAuthController {
  constructor(private apiGatewayAuthService: ApiGatewayAuthService) {}
}
