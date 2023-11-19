import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser } from "@food-stories/common/typings";
import { API_ENDPOINTS } from "@food-stories/users-client/shared/config";

@Injectable()
export class ProfileHttpService {
  constructor(private http: HttpClient) {}

  getUserData(username: string) {
    return this.http.get<IUser>(API_ENDPOINTS.GET_USER_DATA + username)
  }

  getCurrentUserData(email: string) {
    return this.http.get<IUser>(API_ENDPOINTS.GET_CURRENT_USER_DATA + email);
  }
}