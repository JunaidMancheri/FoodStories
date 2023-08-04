import { apiGatewayAuth } from './api-gateway-auth';

describe('apiGatewayAuth', () => {
  it('should work', () => {
    expect(apiGatewayAuth()).toEqual('api-gateway-auth');
  });
});
