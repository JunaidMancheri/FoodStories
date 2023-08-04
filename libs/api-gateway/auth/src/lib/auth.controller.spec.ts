import { Test } from '@nestjs/testing';
import { ApiGatewayAuthController } from './auth.controller';
import { ApiGatewayAuthService } from './auth.service';

describe('ApiGatewayAuthController', () => {
  let controller: ApiGatewayAuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiGatewayAuthService],
      controllers: [ApiGatewayAuthController],
    }).compile();

    controller = module.get(ApiGatewayAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
