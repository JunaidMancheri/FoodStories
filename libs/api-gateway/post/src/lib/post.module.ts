import { Module } from '@nestjs/common';
import { ApiGatewayPostController } from './post.controller';
import { ApiGatewayPostService } from './post.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TOKEN } from './token';
import { PostsAppConfig } from './config';
import { join } from 'path';

@Module({
  controllers: [ApiGatewayPostController],
  providers: [ApiGatewayPostService],
  exports: [],
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: TOKEN.POSTS_PACKAGE,
        options: {
          package: PostsAppConfig.posts_package_name,
          protoPath: join(__dirname, 'proto', 'posts_service.proto'),
          url: process.env['POSTS_SERVICE_URI'],
        }
      }
    ])
  ]
})
export class ApiGatewayPostModule {}
