import { handleGrpcError } from '@food-stories/api-gateway/common';
import { FollowOrUnollowAUserRequest, ISocialNetworkServiceClient } from '@food-stories/common/typings';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Injectable()
export class ApiGatewaySocialNetworkService implements OnModuleInit {
  private socialNetworksService!: ISocialNetworkServiceClient;

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'social_networks_service.v1',
      protoPath: join(__dirname, 'proto', 'social_networks_service.proto'),
      url: process.env['USERS_SERVICE_URI'],
    },
  })
  client!: ClientGrpc;

  onModuleInit() {
    this.socialNetworksService = this.client.getService(
      'SocialNetworksService',
    );
  }

  followAUser(data: FollowOrUnollowAUserRequest) {
    return handleGrpcError(this.socialNetworksService.followAUser(data));
  }

  unfollowAUser(data: FollowOrUnollowAUserRequest) {
    return handleGrpcError(this.socialNetworksService.unfollowAUser(data));
  }

}