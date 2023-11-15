import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '@food-stories/users-client/shared/config';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  getUserData(email: string) {
    return this.http.get(API_ENDPOINTS.GET_USER_DATA + email);
  }
}
