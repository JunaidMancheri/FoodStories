import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { API_ENDPOINTS } from "@food-stories/users-client/shared/config";
import { Observable } from 'rxjs';

@Injectable({
  providedIn:  'root',
})
export class CreatePostService {
  http = inject(HttpClient);

  createPost(description: string): Observable<any> {
    return this.http.post(API_ENDPOINTS.CREATE_POST, {description});
  }
}