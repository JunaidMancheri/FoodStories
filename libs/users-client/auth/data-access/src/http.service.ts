import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_ENDPOINTS } from '@food-stories/users-client/shared/config'

interface UserData {
  email: string;
  password: string;
  userName: string;
  DPURL?: string | null;
}


@Injectable()
export class AuthHttpService {
  constructor(private httpClient: HttpClient) {}

  createUser(userData: UserData): Observable<any> {
    return this.httpClient
    .post(API_ENDPOINTS.CREATE_USER, {
      userName: userData.userName,
      DPURL: userData.DPURL,
      email: userData.email,
    });
  }


  checkUserNameAvailability(username: string) {
    return this.httpClient.get<{success: boolean}>(API_ENDPOINTS.USERNAME_AVAILABILITY + username); 
  }
}