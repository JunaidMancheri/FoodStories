import { Controller, Get } from '@nestjs/common';
import { ApiGatewayAuthService } from './auth.service';

@Controller()
export class ApiGatewayAuthController {
  constructor(private apiGatewayAuthService: ApiGatewayAuthService) {}

  @Get()
  getAll(): any {
    return { success: true}
  }
}
