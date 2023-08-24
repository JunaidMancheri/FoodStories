import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiGatewayUsersService } from './users.service';
import { CreateUserDTO } from './CreateUser.dto';

@Controller()
export class ApiGatewayUsersController {
  constructor(private apiGatewayUsersService: ApiGatewayUsersService) {}

  @Post() 
  async createUser(@Body() createUserDto: CreateUserDTO) {
    Logger.log(createUserDto, 'controller');    
    return this.apiGatewayUsersService.createUser(createUserDto);;
  }
}
