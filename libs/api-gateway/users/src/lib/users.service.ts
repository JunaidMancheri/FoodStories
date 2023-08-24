import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { TOKEN } from './token';
import { ClientGrpc } from '@nestjs/microservices';
import { IUsersServiceClient } from '@food-stories/common/typings/proto/usersService';
import { UsersAppConfig } from './config';
import { CreateUserDTO } from './CreateUser.dto';


@Injectable()
export class ApiGatewayUsersService implements OnModuleInit {
  private usersService!: IUsersServiceClient

  constructor(@Inject(TOKEN.USERS_PACKAGE) private usersServiceClient: ClientGrpc ) {}

  onModuleInit() {
    this.usersService = this.usersServiceClient.getService<IUsersServiceClient>(UsersAppConfig.service_name);
  }

  createUser(createUserDto: CreateUserDTO) {
    return this.usersService.CreateUser(createUserDto);
  }


}
