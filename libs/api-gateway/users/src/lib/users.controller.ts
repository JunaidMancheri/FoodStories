import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiGatewayUsersService } from './users.service';
import { CreateUserDTO } from './CreateUser.dto';

@Controller()
export class ApiGatewayUsersController {
  constructor(private apiGatewayUsersService: ApiGatewayUsersService) {}


  @Get(':username')
  checkUser(@Param() params: {username: string}) {
    const response = this.apiGatewayUsersService.isUsernameAvailable({username: params.username});
    return response;
  }

  @Post() 
   createUser(@Body() createUserDto: CreateUserDTO) {
    Logger.log(createUserDto, 'controller');    
    return this.apiGatewayUsersService.createUser(createUserDto);
  }
}
