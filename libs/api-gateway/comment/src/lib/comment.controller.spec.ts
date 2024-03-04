import { Test } from '@nestjs/testing';
import { ApiGatewayCommentController } from './comment.controller';
import { ApiGatewayCommentService } from './comment.service';

describe('ApiGatewayCommentController', () => {
  let controller: ApiGatewayCommentController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiGatewayCommentService],
      controllers: [ApiGatewayCommentController],
    }).compile();

    controller = module.get(ApiGatewayCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
