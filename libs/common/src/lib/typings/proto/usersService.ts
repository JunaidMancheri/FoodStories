  import {  Metadata, handleUnaryCall } from '@grpc/grpc-js';
  import { Observable } from 'rxjs';

  export interface IUsersServiceClient {
    createUser(request: ICreateUserRequest, metadata?: Metadata):  Observable<ICreateUserResponse>;
    isUsernameAvailable(request: IisUsernameAvailableRequest, metadata?: Metadata): Observable<IisUsernameAvailableResponse>;
  }

  export interface IUsersServiceServer {
    createUser: handleUnaryCall<ICreateUserRequest, ICreateUserResponse>;
    isUsernameAvailable: handleUnaryCall<IisUsernameAvailableRequest, IisUsernameAvailableResponse>;
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
    name?: string;
    username: string;
    email: string;
    isPrivate: boolean;
    createdAt: number;
    DPURL: string;
    profile: Profile;
  }


