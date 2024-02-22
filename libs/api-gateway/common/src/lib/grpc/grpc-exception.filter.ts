import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Status } from '@grpc/grpc-js/build/src/constants';
import {  Response } from 'express'
import { ServerErrorResponse } from '@grpc/grpc-js';
import { GrpcException } from './grpc.exception';

@Catch(GrpcException)
export class GrpcExceptionFilter implements ExceptionFilter {
  catch(exception: GrpcException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const error = exception.getError() as ServerErrorResponse;
    let statusCode = 500;
    const message = error.details || 'Internal Server  Error';
    switch(error.code) {
      case Status.NOT_FOUND:
        statusCode = 404;
        break;
      case Status.ALREADY_EXISTS:
        statusCode = 409;
        break;
      case Status.INVALID_ARGUMENT:
        statusCode = 400;
        break;
      case Status.PERMISSION_DENIED:
        statusCode = 403;
        break;
      case Status.UNAUTHENTICATED:
        statusCode = 401;
        break;
    }

    response.status(statusCode).json({ statusCode, message });
   
  }

}
