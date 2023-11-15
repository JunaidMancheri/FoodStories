  import {  Metadata, handleUnaryCall } from '@grpc/grpc-js';
  import { Observable } from 'rxjs';

  export interface IUsersServiceClient {
    createUser(request: ICreateUserRequest, metadata?: Metadata):  Observable<ICreateUserResponse>;
    isUsernameAvailable(request: IisUsernameAvailableRequest, metadata?: Metadata): Observable<IisUsernameAvailableResponse>;
    isRegisteredUser(request: IisRegisteredUserRequest, metadata?: Metadata): Observable<IisRegisteredUserResponse>
    getUserData(request: IgetUserDataRequest, metadata?: Metadata): Observable<IgetUserDataResponse>;
  }

  export interface IUsersServiceServer {
    createUser: handleUnaryCall<ICreateUserRequest, ICreateUserResponse>;
    isUsernameAvailable: handleUnaryCall<IisUsernameAvailableRequest, IisUsernameAvailableResponse>;
    isRegisteredUser: handleUnaryCall<IisRegisteredUserRequest, IisRegisteredUserResponse>;
    getUserData: handleUnaryCall<IgetUserDataRequest, IgetUserDataResponse>;
  }


  export interface IgetUserDataRequest {
    email: string;
  }
  
  export interface IgetUserDataResponse {
    id: string;
    name: string | null;
    username: string;
    email: string;
    isPrivate: boolean;
    createdAt: number;
    DPURL: string | null;
    profile: Profile;
    postsCount: number;
    followersCount: number;
    followingsCount: number;
  }

  export interface IisRegisteredUserRequest {
    email: string;
  }

  export interface IisRegisteredUserResponse {
    registered: boolean;
  }

  export interface IisUsernameAvailableRequest {
    username: string;
  }
  
  export interface IisUsernameAvailableResponse {
    available: boolean;
  }

  export interface ICreateUserRequest {
     username: string;
     email: string;
     DPURL?: string
  }

  interface Profile {
    bio?: string;
    gender?: 'male' | 'female' ,
    links?: string[];
  }
  
  export interface ICreateUserResponse {
    id: string;
    name: string | null;
    username: string;
    email: string;
    isPrivate: boolean;
    createdAt: number;
    DPURL: string | null;
    profile: Profile;
    postsCount: number;
    followersCount: number;
    followingsCount: number;
  }


