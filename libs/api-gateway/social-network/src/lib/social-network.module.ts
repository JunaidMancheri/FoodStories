import { Module } from '@nestjs/common';
import { ApiGatewaySocialNetworkController } from './social-network.controller';
import { ApiGatewaySocialNetworkService } from './social-network.service';
@Module({
  controllers: [ApiGatewaySocialNetworkController],
  providers: [ApiGatewaySocialNetworkService],
  exports: [ApiGatewaySocialNetworkService],
})
export class ApiGatewaySocialNetworkModule {}

