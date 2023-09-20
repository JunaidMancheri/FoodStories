import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiGatewayUsersService } from './users.service';
import { CreateUserDTO } from './CreateUser.dto';

@Controller()
export class ApiGatewayUsersController {
  constructor(private apiGatewayUsersService: ApiGatewayUsersService) {}


  @Get(':username')
  checkUser(@Param() username: string) {
    console.log(username);
    return { success: false}
  }

  @Post() 
   createUser(@Body() createUserDto: CreateUserDTO) {
    Logger.log(createUserDto, 'controller');    
    return this.apiGatewayUsersService.createUser(createUserDto);
  }
}
