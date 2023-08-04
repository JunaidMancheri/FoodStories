import { Module } from '@nestjs/common';
import { ApiGatewayAuthModule } from '@food-stories/api-gateway/auth'


@Module({
  imports: [ApiGatewayAuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
