import { Module } from '@nestjs/common';
import { ApiGatewayFeedController } from './feed.controller';
import { ApiGatewaySocialNetworkModule } from '@food-stories/api-gateway/social-network';
import { ApiGatewayPostModule } from '@food-stories/api-gateway/post';
import { ApiGatewayLikeModule } from '@food-stories/api-gateway/like';

@Module({
  controllers: [ApiGatewayFeedController],
  providers: [],
  exports: [],
  imports: [
    ApiGatewaySocialNetworkModule,
    ApiGatewayPostModule,
    ApiGatewayLikeModule,
  ],
})
export class ApiGatewayFeedModule {}
