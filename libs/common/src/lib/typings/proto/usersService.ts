  import {  Metadata, handleUnaryCall } from '@grpc/grpc-js';

  export interface IUsersServiceClient {
    CreateUser(request: ICreateUserRequest, metadata?: Metadata): ICreateUserResponse;
  }

  export interface IUsersServiceServer {
    CreateUser: handleUnaryCall<ICreateUserRequest, ICreateUserResponse>;
  }
  
  export interface ICreateUserRequest {
     name: string;
     userName: string;
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
    name: string;
    userName: string;
    email: string;
    isPrivate: boolean;
    createdAt: number;
    DPURL: string;
    profile: Profile;
  }


