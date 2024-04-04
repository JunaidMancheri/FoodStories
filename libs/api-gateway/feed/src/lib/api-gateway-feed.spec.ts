import { apiGatewayFeed } from './api-gateway-feed';

describe('apiGatewayFeed', () => {
  it('should work', () => {
    expect(apiGatewayFeed()).toEqual('api-gateway-feed');
  });
});
