import { handleUnaryCall } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export interface ISocialNetworkServiceServer {
  followAUser: handleUnaryCall<FollowOrUnollowAUserRequest, void>;
  unfollowAUser: handleUnaryCall<FollowOrUnollowAUserRequest, void>;
  isFollowing: handleUnaryCall<FollowOrUnollowAUserRequest, void>;
  BlockUser: handleUnaryCall<IBlockUserRequest, void>;
  unblockUser: handleUnaryCall<IBlockUserRequest, void>;
  hasBlocked: handleUnaryCall<IHasBlockedRequest, IHasBlockedResponse>;
  getFollowings: handleUnaryCall<GetFollowingsRequest, GetFollowingsResponse>;
}

export interface ISocialNetworkServiceClient {
  followAUser(request: FollowOrUnollowAUserRequest): Observable<void>;
  unfollowAUser(request: FollowOrUnollowAUserRequest): Observable<void>;
  isFollowing(request: FollowOrUnollowAUserRequest): Observable<void>;
  BlockUser(request: IBlockUserRequest): Observable<void>;
  unblockUser(request: IBlockUserRequest): Observable<void>;
  hasBlocked(request: IHasBlockedRequest): Observable<IHasBlockedResponse>;
  getFollowings(
    request: GetFollowingsRequest
  ): Observable<GetFollowingsResponse>;
}

export interface GetFollowingsResponse {
  users: { id: string; username: string; DPURL: string }[];
}

export interface GetFollowingsRequest {
  userId: string;
}

export interface IHasBlockedResponse {
  hasBlocked: boolean;
}

export interface IHasBlockedRequest {
  targetUserId: string;
  blockerUsername: string;
}

export interface IBlockUserRequest {
  blockerId: string;
  targetId: string;
}

export interface IisFollowingResponse {
  isFollowing: boolean;
  isBlocked: boolean;
}

export interface FollowOrUnollowAUserRequest {
  followerId: string;
  followeeId: string;
  followerUsername?: string;
}
