import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { TOKEN } from './token';
import { ClientGrpc } from '@nestjs/microservices';
import { IUsersServiceClient } from '@food-stories/common/typings/proto/usersService';
import { UsersAppConfig } from './config';
import { CreateUserDTO } from './CreateUser.dto';
import { catchError, map } from 'rxjs';



@Injectable()
export class ApiGatewayUsersService implements OnModuleInit {
  private usersService!: IUsersServiceClient

  constructor(@Inject(TOKEN.USERS_PACKAGE) private usersServiceClient: ClientGrpc ) {}

  onModuleInit() {
    this.usersService = this.usersServiceClient.getService<IUsersServiceClient>(UsersAppConfig.service_name);
  }

   createUser(createUserDto: CreateUserDTO) {
    return this.usersService.createUser(createUserDto);
  }

  isUsernameAvailable(data: {username : string}) {
    return this.usersService.isUsernameAvailable(data).pipe(map((value) => {
      return value;
    }),
    catchError((error) => {
      console.log('helo werror')
      return error;
    })
    )
  }
 
  isRegisteredUser(data: { email: string }) {
    return this.usersService.isRegisteredUser(data);
  }

}
