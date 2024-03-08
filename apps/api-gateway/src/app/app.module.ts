import { Module } from '@nestjs/common';
import { ApiGatewayUsersModule } from '@food-stories/api-gateway/users'
import { ApiGatewayPostModule } from '@food-stories/api-gateway/post';
import { ApiGatewayLikeModule } from '@food-stories/api-gateway/like';
import { ConfigModule } from '@nestjs/config'
import { FirebaseAdminModule } from '@food-stories/api-gateway/core/firebase-admin';
import { ApiGatewayCommentModule } from '@food-stories/api-gateway/comment';
import { ApiGatewaySocialNetworkModule } from '@food-stories/api-gateway/social-network';


@Module({
  imports: [
    ApiGatewayUsersModule,
    ApiGatewayPostModule,
    ApiGatewayLikeModule,
    FirebaseAdminModule,
    ApiGatewayCommentModule,
    ApiGatewaySocialNetworkModule,
    ConfigModule.forRoot({isGlobal: true}),
],
  controllers: [],
  providers: [  ],
  exports: []
})
export class AppModule {}
