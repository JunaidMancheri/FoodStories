import { apiGatewayPost } from './api-gateway-post';

describe('apiGatewayPost', () => {
  it('should work', () => {
    expect(apiGatewayPost()).toEqual('api-gateway-post');
  });
});
