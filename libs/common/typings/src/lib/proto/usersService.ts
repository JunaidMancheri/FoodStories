  import {  Metadata, handleUnaryCall } from '@grpc/grpc-js';
  import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser.interface';

  export interface IUsersServiceClient {
    createUser(request: ICreateUserRequest, metadata?: Metadata):  Observable<IUser>;
    isUsernameAvailable(request: IisUsernameAvailableRequest, metadata?: Metadata): Observable<IisUsernameAvailableResponse>;
    isRegisteredUser(request: IisRegisteredUserRequest, metadata?: Metadata): Observable<IisRegisteredUserResponse>
    getCurrentUserData(request: IgetCurrentUserDataRequest, metadata?: Metadata): Observable<IUser>;
    getUserData(request: IgetUserDataRequest, metadata?: Metadata) : Observable<IUser>
  }

  export interface IUsersServiceServer {
    createUser: handleUnaryCall<ICreateUserRequest, IUser>;
    isUsernameAvailable: handleUnaryCall<IisUsernameAvailableRequest, IisUsernameAvailableResponse>;
    isRegisteredUser: handleUnaryCall<IisRegisteredUserRequest, IisRegisteredUserResponse>;
    getCurrentUserData: handleUnaryCall<IgetCurrentUserDataRequest, IUser>;
    getUserData: handleUnaryCall<IgetUserDataRequest, IUser>;
  }


  export interface IgetUserDataRequest {
    username: string;
  }

  export interface IgetCurrentUserDataRequest {
    email: string;
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



