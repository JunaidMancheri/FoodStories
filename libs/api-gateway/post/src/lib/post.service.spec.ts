import { Test } from '@nestjs/testing';
import { ApiGatewayPostService } from './post.service';

describe('ApiGatewayPostService', () => {
  let service: ApiGatewayPostService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiGatewayPostService],
    }).compile();

    service = module.get(ApiGatewayPostService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
