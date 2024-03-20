import { Module } from '@nestjs/common';
import { ApiGatewayNotificationsController } from './notifications.controller';
import { ApiGatewayNotificationsService } from './notifications.service';
import { NotificationsGateway } from './websocket.gateway';

@Module({
  controllers: [ApiGatewayNotificationsController],
  providers: [ApiGatewayNotificationsService, NotificationsGateway],
  exports: [ApiGatewayNotificationsService],
})
export class ApiGatewayNotificationsModule {}
