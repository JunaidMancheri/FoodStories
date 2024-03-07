import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { CommentsAppConfig } from './config';
import { join } from 'path';
import {
  IAddCommentRequest,
  ICommentsServiceClient,
  IGetCommentsForAPostRequest,
} from '@food-stories/common/typings';
import { handleGrpcError } from '@food-stories/api-gateway/common';

@Injectable()
export class ApiGatewayCommentService implements OnModuleInit {
  private commentsService!: ICommentsServiceClient;

  @Client({
    transport: Transport.GRPC,
    options: {
      package: CommentsAppConfig.comments_package_name,
      protoPath: join(__dirname, 'proto', 'comments_service.proto'),
      url: process.env['COMMENTS_SERVICE_URI'],
    },
  })
  client!: ClientGrpc;

  onModuleInit() {
    this.commentsService = this.client.getService(
      CommentsAppConfig.service_name
    );
  }

  addComment(data: IAddCommentRequest) {
    return handleGrpcError(this.commentsService.addComment(data));
  }

  getCommentsForAPost(data: IGetCommentsForAPostRequest) {
    return handleGrpcError(this.commentsService.getCommentsForAPost(data));
  }
}
