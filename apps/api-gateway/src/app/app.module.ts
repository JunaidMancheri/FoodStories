import { Module } from '@nestjs/common';
import { ApiGatewayAuthModule } from '@food-stories/api-gateway/auth'
import { ConfigModule } from '@nestjs/config'
import { RouterModule } from '@nestjs/core';
import { appRoutes } from './app.routes';


@Module({
  imports: [
    ApiGatewayAuthModule,
    ConfigModule.forRoot(),
    RouterModule.register(appRoutes)
],
  controllers: [],
  providers: [],
})
export class AppModule {}
