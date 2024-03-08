import { Test } from '@nestjs/testing';
import { ApiGatewaySocialNetworkService } from './social-network.service';

describe('ApiGatewaySocialNetworkService', () => {
  let service: ApiGatewaySocialNetworkService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiGatewaySocialNetworkService],
    }).compile();

    service = module.get(ApiGatewaySocialNetworkService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
