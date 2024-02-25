import { Module } from '@nestjs/common';
import { ApiGatewayUsersModule } from '@food-stories/api-gateway/users'
import { ApiGatewayPostModule } from '@food-stories/api-gateway/post';
import { ConfigModule } from '@nestjs/config'
import { RouterModule } from '@nestjs/core';
import { appRoutes } from './app.routes';
import { FirebaseAdminModule } from '@food-stories/api-gateway/core/firebase-admin';


@Module({
  imports: [
    ApiGatewayUsersModule,
    ApiGatewayPostModule,
    FirebaseAdminModule,
    ConfigModule.forRoot(),
    RouterModule.register(appRoutes)
],
  controllers: [],
  providers: [  ],
  exports: []
})
export class AppModule {}
