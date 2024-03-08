import { Test } from '@nestjs/testing';
import { ApiGatewayPostController } from './post.controller';
import { ApiGatewayPostService } from './post.service';

describe('ApiGatewayPostController', () => {
  let controller: ApiGatewayPostController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiGatewayPostService],
      controllers: [ApiGatewayPostController],
    }).compile();

    controller = module.get(ApiGatewayPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
