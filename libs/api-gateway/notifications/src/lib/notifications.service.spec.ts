import { Test } from '@nestjs/testing';
import { ApiGatewayNotificationsService } from './notifications.service';

describe('ApiGatewayNotificationsService', () => {
  let service: ApiGatewayNotificationsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiGatewayNotificationsService],
    }).compile();

    service = module.get(ApiGatewayNotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
