import { Test } from '@nestjs/testing';
import { ApiGatewaySocialNetworkController } from './social-network.controller';
import { ApiGatewaySocialNetworkService } from './social-network.service';

describe('ApiGatewaySocialNetworkController', () => {
  let controller: ApiGatewaySocialNetworkController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiGatewaySocialNetworkService],
      controllers: [ApiGatewaySocialNetworkController],
    }).compile();

    controller = module.get(ApiGatewaySocialNetworkController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
