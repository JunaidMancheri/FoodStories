import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiGatewayUsersService } from './users.service';
import { CreateUserDTO } from './CreateUser.dto';
import { EditProfileData } from '@food-stories/common/typings';
import { AuthGuard } from '@food-stories/api-gateway/common';
import { map } from 'rxjs';

@Controller('users')
@UseGuards(AuthGuard)
export class ApiGatewayUsersController {
  constructor(private apiGatewayUsersService: ApiGatewayUsersService) {}

  @Get('username/:username')
  checkUsername(@Param() params: { username: string }) {
    const response = this.apiGatewayUsersService.isUsernameAvailable({
      username: params.username,
    });
    return response;
  }

  @Get(':username')
  getUserDetails(@Param() params: { username: string }) {
    return this.apiGatewayUsersService.getUserData({
      username: params.username,
    });
  }

  @Get('registered/:email')
  isRegisteredUser(@Param('email') email: string) {
    return this.apiGatewayUsersService.isRegisteredUser({ email });
  }

  @Get('email/:email')
  getCurrentUserData(@Param('email') email: string) {
    return this.apiGatewayUsersService.getCurrentUserData({ email });
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDTO) {
    return this.apiGatewayUsersService.createUser(createUserDto);
  }

  @Get('/search')
  searchUsers(@Query('query') query: string) {
    this.apiGatewayUsersService
      .searchUsers({ query })
      .pipe(map((results) => (results.results ? results : { results: [] })));
  }

  @Put('profile')
  updateUserProfile(@Body() updates: EditProfileData) {
    return this.apiGatewayUsersService.udpateUserProfile({
      name: updates.name,
      username: updates.username,
      bio: updates.bio,
      gender: updates.gender,
      DPURL: updates.DPURL,
      id: updates.id,
    });
  }
}
