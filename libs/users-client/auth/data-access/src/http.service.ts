import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { API_ENDPOINTS } from '@food-stories/users-client/shared/config'

interface UserData {
  email: string | null;
  username: string;
  DPURL?: string | null;
}


@Injectable()
export class AuthHttpService {
  constructor(private httpClient: HttpClient) {}


  createUser(userData: UserData) {
    return this.httpClient
    .post(API_ENDPOINTS.CREATE_USER, {
      username: userData.username,
      DPURL: userData.DPURL,
      email: userData.email,
    });
  }


  checkUserNameAvailability(username: string) {
    return this.httpClient.get<{available: boolean}>(API_ENDPOINTS.USERNAME_AVAILABILITY + username); 
  }

  isRegisteredUser(email: string) {
    return this.httpClient.get<{registered: boolean}>(API_ENDPOINTS.IS_REGISTERED_USER + email)
    .pipe(map((response) => response.registered));
  }
}