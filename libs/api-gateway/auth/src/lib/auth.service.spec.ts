import { Test } from '@nestjs/testing';
import { ApiGatewayAuthService } from './auth.service';

describe('ApiGatewayAuthService', () => {
  let service: ApiGatewayAuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiGatewayAuthService],
    }).compile();

    service = module.get(ApiGatewayAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
