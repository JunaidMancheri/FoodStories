import { Test } from '@nestjs/testing';
import { ApiGatewayFeedController } from './feed.controller';

describe('ApiGatewayFeedController', () => {
  let controller: ApiGatewayFeedController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiGatewayFeedController],
    }).compile();

    controller = module.get(ApiGatewayFeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
