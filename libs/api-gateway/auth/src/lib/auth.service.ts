import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ApiGatewayAuthService {
    constructor(@Inject('AUTH_PACKAGE') auth: any) {
    console.log(auth);
  }
}
