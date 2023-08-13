import { Controller, Get } from '@nestjs/common';
import { ApiGatewayUsersService } from './users.service';

@Controller()
export class ApiGatewayUsersController {
  constructor(private apiGatewayUsersService: ApiGatewayUsersService) {}

  @Get() 
  async getUser() {
    return this.apiGatewayUsersService.createUser();;
  }
}
