import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { TOKEN } from './token';

@Injectable()
export class ApiGatewayAuthService {
    constructor(@Inject(TOKEN.AUTH_PACKAGE) auth: ClientGrpc) {
    console.log(auth);
    console.log(process.env['AUTH_SERVICE_URI'])
  }
}
