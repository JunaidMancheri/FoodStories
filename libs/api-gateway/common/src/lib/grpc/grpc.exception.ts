import { RpcException } from "@nestjs/microservices";

export class GrpcException extends RpcException {
  constructor(error: object ) {
    super(error);
  }
}