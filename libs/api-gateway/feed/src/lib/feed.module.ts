import { Module } from '@nestjs/common';
import { ApiGatewayFeedController } from './feed.controller';
import { ApiGatewaySocialNetworkModule } from '@food-stories/api-gateway/social-network';
import { ApiGatewayPostModule } from '@food-stories/api-gateway/post';

@Module({
  controllers: [ApiGatewayFeedController],
  providers: [],
  exports: [],
  imports: [
    ApiGatewaySocialNetworkModule,
    ApiGatewayPostModule,
  ],
})
export class ApiGatewayFeedModule {}
