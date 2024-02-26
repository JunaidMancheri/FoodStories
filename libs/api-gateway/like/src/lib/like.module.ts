import { Module } from '@nestjs/common';
import { ApiGatewayLikeController } from './like.controller';
import { ApiGatewayLikeService } from './like.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TOKEN } from './token';
import { likesAppConfig } from './confg';
import { join } from 'path';

@Module({
  controllers: [ApiGatewayLikeController],
  providers: [ApiGatewayLikeService],
  exports: [],
  imports : [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: TOKEN.LIKES_PACKAGE,
        options: {
          package: likesAppConfig.likes_package_name,
          protoPath: join(__dirname, 'proto', 'likes_service.proto'),
          url: process.env['POSTS_SERVICE_URI'],
        }
      }
    ])
  ]
})
export class ApiGatewayLikeModule {}
