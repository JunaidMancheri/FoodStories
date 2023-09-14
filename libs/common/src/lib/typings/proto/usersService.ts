  import {  Metadata, handleUnaryCall } from '@grpc/grpc-js';
  import { Observable } from 'rxjs';

  export interface IUsersServiceClient {
    CreateUser(request: ICreateUserRequest, metadata?: Metadata):  Observable<ICreateUserResponse> ;
  }

  export interface IUsersServiceServer {
    CreateUser: handleUnaryCall<ICreateUserRequest, ICreateUserResponse>;
  }
  
  export interface ICreateUserRequest {
     userName: string;
     email: string;
     DPURL?: string
     emailVerified: boolean;
  }

  interface Profile {
    bio?: string;
    gender?: 'male' | 'female' ,
    links?: string[];
  }
  
  export interface ICreateUserResponse {
    id: string;
    name?: string;
    userName: string;
    email: string;
    emailVerified: boolean;
    isPrivate: boolean;
    createdAt: number;
    DPURL: string;
    profile: Profile;
  }


