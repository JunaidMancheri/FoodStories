import { Module } from '@nestjs/common';
import { ApiGatewayUsersController } from './users.controller';
import { ApiGatewayUsersService } from './users.service';
import {ClientsModule, Transport} from '@nestjs/microservices'
import { join } from 'path';
import { TOKEN } from './token';
import { UsersAppConfig } from './config';

@Module({
  imports:[
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: TOKEN.USERS_PACKAGE,
        options: {
          package: UsersAppConfig.users_package_name,
          protoPath: join(__dirname, 'proto', 'users_service.proto'),
          url:  process.env['USERS_SERVICE_URI'],
        }

      }
    ])
  ],
  controllers: [ApiGatewayUsersController],
  providers: [ApiGatewayUsersService],
  exports: [ApiGatewayUsersService],
})
export class ApiGatewayUsersModule {}
