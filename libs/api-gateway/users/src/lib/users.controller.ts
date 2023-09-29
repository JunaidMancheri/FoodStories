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
  
  @Get('email/:email')
  isRegisteredUser(@Param() params: { email: string}) {
    console.log(params);
    return this.apiGatewayUsersService.isRegisteredUser({ email: params.email });
  }

  @Post() 
   createUser(@Body() createUserDto: CreateUserDTO) {
    Logger.log(createUserDto, 'controller');    
    return this.apiGatewayUsersService.createUser(createUserDto);
  }
}
