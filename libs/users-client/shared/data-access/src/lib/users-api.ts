import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditProfileData, IUser } from '@food-stories/common/typings';
import { API_ENDPOINTS } from '@food-stories/users-client/shared/config';
import { map } from 'rxjs';

@Injectable()
export class ProfileHttpService {
  constructor(private http: HttpClient) {}

  getUserData(data: { username: string; userId: string }) {
    return this.http.get<IUser>(API_ENDPOINTS.GET_USER_DATA + data.username, {
      params: { userId: data.userId },
    });
  }

  getCurrentUserData(email: string) {
    return this.http.get<IUser>(API_ENDPOINTS.GET_CURRENT_USER_DATA + email);
  }

  isUsernameAvailable(username: string) {
    return this.http
      .get<{ available: boolean }>(
        API_ENDPOINTS.USERNAME_AVAILABILITY + username
      )
      .pipe(map((response) => response.available));
  }

  updateUserProfile(updates: EditProfileData) {
    return this.http.put<IUser>(API_ENDPOINTS.UPDATE_USER_PROFILE, updates);
  }
}
