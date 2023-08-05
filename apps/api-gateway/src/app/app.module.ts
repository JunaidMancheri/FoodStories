import { Module, OnModuleInit } from '@nestjs/common';
import { ApiGatewayAuthModule } from '@food-stories/api-gateway/auth'
import { ConfigModule } from '@nestjs/config'
import { RouterModule } from '@nestjs/core';


@Module({
  imports: [
    ApiGatewayAuthModule,
    ConfigModule.forRoot(),
    RouterModule.register([
    {
      path: 'auth',
      module: ApiGatewayAuthModule,
    }
  ])
],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('module init');
    console.log(process.env['AUTH_SERVICE_URI'])
  }
}
