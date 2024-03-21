import { Controller } from '@nestjs/common';
import { ApiGatewayNotificationsService } from './notifications.service';

@Controller('notifications')
export class ApiGatewayNotificationsController {
  constructor(
    private apiGatewayNotificationsService: ApiGatewayNotificationsService
  ) {}
}
