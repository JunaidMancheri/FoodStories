import { Test } from '@nestjs/testing';
import { ApiGatewayNotificationsController } from './notifications.controller';
import { ApiGatewayNotificationsService } from './notifications.service';

describe('ApiGatewayNotificationsController', () => {
  let controller: ApiGatewayNotificationsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiGatewayNotificationsService],
      controllers: [ApiGatewayNotificationsController],
    }).compile();

    controller = module.get(ApiGatewayNotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
