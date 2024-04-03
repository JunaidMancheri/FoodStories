import { handleUnaryCall } from "@grpc/grpc-js";
import { Observable } from "rxjs";

export  interface ISocialNetworkServiceServer {
   followAUser: handleUnaryCall<FollowOrUnollowAUserRequest, void>
   unfollowAUser: handleUnaryCall<FollowOrUnollowAUserRequest, void>
   isFollowing: handleUnaryCall<FollowOrUnollowAUserRequest, void>
   BlockUser: handleUnaryCall<IBlockUserRequest, void>;
   unblockUser: handleUnaryCall<IBlockUserRequest, void>;

}


export interface ISocialNetworkServiceClient {
  followAUser(request:FollowOrUnollowAUserRequest) :Observable<void>;
  unfollowAUser(request: FollowOrUnollowAUserRequest): Observable<void>;
  isFollowing(request: FollowOrUnollowAUserRequest): Observable<void>;
  BlockUser(request: IBlockUserRequest): Observable<void>;
  unblockUser(request: IBlockUserRequest): Observable<void>;
}

export interface  IBlockUserRequest {
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


