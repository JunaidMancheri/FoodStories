import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { TOKEN } from './token';
import { ClientGrpc } from '@nestjs/microservices';
import { IUsersServiceClient, IgetUserDataRequest } from '@food-stories/common/typings/proto/usersService';
import { UsersAppConfig } from './config';
import { CreateUserDTO } from './CreateUser.dto';
import { handleGrpcError } from '@food-stories/api-gateway/common';



@Injectable()
export class ApiGatewayUsersService implements OnModuleInit {
  private usersService!: IUsersServiceClient

  constructor(@Inject(TOKEN.USERS_PACKAGE) private usersServiceClient: ClientGrpc ) {}



  onModuleInit() {
    this.usersService = this.usersServiceClient.getService<IUsersServiceClient>(UsersAppConfig.service_name);
  }

   createUser(createUserDto: CreateUserDTO) {
    return handleGrpcError(this.usersService.createUser(createUserDto));
  }

  isUsernameAvailable(data: {username : string}) {
    return handleGrpcError(this.usersService.isUsernameAvailable(data));
  }
 
  isRegisteredUser(data: { email: string }) {
    return handleGrpcError(this.usersService.isRegisteredUser(data));
  }

  async getUserData(data: IgetUserDataRequest) {
    return handleGrpcError(this.usersService.getUserData(data));
  }

}


