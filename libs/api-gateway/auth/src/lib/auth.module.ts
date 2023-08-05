import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TOKEN } from './token';

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: TOKEN.AUTH_PACKAGE,
        options: {
          package: 'auth',
          protoPath: join(__dirname, 'proto', 'auth.proto'),
          url: process.env['AUTH_SERVICE_URI'],
        }
      }
    ])

  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class ApiGatewayAuthModule {}
