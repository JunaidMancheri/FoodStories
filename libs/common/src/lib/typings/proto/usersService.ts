  import { handleUnaryCall } from '@grpc/grpc-js';

  export interface IUsersServiceClient {
    CreateUser(request: ICreateUserRequest): ICreateUserResponse;
  }

  export interface IUsersServiceServer {
    CreateUser: handleUnaryCall<ICreateUserRequest, ICreateUserResponse>;
  }
  
  export interface ICreateUserRequest {
     id: number;
  }
  
  export interface ICreateUserResponse {
    id: number;
    name: string;
  }


