import { Test } from '@nestjs/testing';
import { ApiGatewayLikeController } from './like.controller';

describe('ApiGatewayLikeController', () => {
  let controller: ApiGatewayLikeController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiGatewayLikeController],
    }).compile();

    controller = module.get(ApiGatewayLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
