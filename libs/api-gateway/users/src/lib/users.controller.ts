import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiGatewayUsersService } from './users.service';
import { CreateUserDTO } from './CreateUser.dto';
import { EditProfileData } from '@food-stories/common/typings';
import { AuthGuard } from '@food-stories/api-gateway/common';
import { firstValueFrom, map, tap } from 'rxjs';
import { ApiGatewaySocialNetworkService } from '@food-stories/api-gateway/social-network';

@Controller('users')
// @UseGuards(AuthGuard)
export class ApiGatewayUsersController {
  constructor(
    private apiGatewayUsersService: ApiGatewayUsersService,
    private socialNetworkService: ApiGatewaySocialNetworkService
  ) {}


   @Get()
   getUesrs() {
    return this.apiGatewayUsersService.getUsers();
   }

  @Get('username/:username')
  checkUsername(@Param() params: { username: string }) {
    const response = this.apiGatewayUsersService.isUsernameAvailable({
      username: params.username,
    });
    return response;
  }

  @Patch('privacy/:userId/:mode')
  changeAccountPrivacy(@Param() params: { userId: string; mode: string }) {
    console.log(params);
    if (params.mode === 'private') {
      return this.apiGatewayUsersService.makeAccountPrivate({
        userId: params.userId,
      });
    } else {
      return this.apiGatewayUsersService.makeAccountPublic({
        userId: params.userId,
      });
    }
  }

  @Get('/search')
  searchUsers(@Query('query') query: string) {
    return this.apiGatewayUsersService.searchUsers({ query }).pipe(
      map((results) => (results.results ? results : { results: [] }))
    );
  }

  @Get(':username')
  async getUserDetails(
    @Param() params: { username: string },
    @Query('userId') userId: string
  ) {
      const result = await firstValueFrom(
        this.socialNetworkService.hasBlocked({
          blockerUsername: params.username,
          targetUserId: userId,
        })
      );

      if (result.hasBlocked) {
        throw new NotFoundException();
      }
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
