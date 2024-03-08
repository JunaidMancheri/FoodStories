import { Test } from '@nestjs/testing';
import { ApiGatewayCommentService } from './comment.service';

describe('ApiGatewayCommentService', () => {
  let service: ApiGatewayCommentService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiGatewayCommentService],
    }).compile();

    service = module.get(ApiGatewayCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
