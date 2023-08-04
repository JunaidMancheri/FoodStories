import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ApiGatewayAuthService {
    constructor(@Inject('AUTH_PACKAGE') auth: ClientGrpc) {
    console.log(auth);
    console.log(process.env['AUTH_SERVICE_URI'])
  }
}
