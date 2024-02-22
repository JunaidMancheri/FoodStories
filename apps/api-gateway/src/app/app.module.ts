import { Module } from '@nestjs/common';
import { ApiGatewayAuthModule } from '@food-stories/api-gateway/auth'
import { ApiGatewayUsersModule } from '@food-stories/api-gateway/users'
import { ApiGatewayPostModule } from '@food-stories/api-gateway/post';
import { ConfigModule } from '@nestjs/config'
import { RouterModule } from '@nestjs/core';
import { appRoutes } from './app.routes';
import { FirebaseAdminModule } from '@food-stories/api-gateway/core/firebase-admin';


@Module({
  imports: [
    // ApiGatewayAuthModule,
    ApiGatewayUsersModule,
    ApiGatewayPostModule,

    // Core modules
    FirebaseAdminModule,
    
    ConfigModule.forRoot(),
    RouterModule.register(appRoutes)
],
  controllers: [],
  providers: [],
})
export class AppModule {}
