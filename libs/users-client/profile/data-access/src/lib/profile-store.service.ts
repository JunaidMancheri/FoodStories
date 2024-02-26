import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { IPost } from "@food-stories/common/typings";
import { API_ENDPOINTS } from "@food-stories/users-client/shared/config";
import { tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class ProfileStoreService {
  private http = inject(HttpClient);

  getUsersPosts(userId: string) {
    return this.http.get<IPost[]>(API_ENDPOINTS.Posts.getUsersPosts(userId)).pipe(tap((data) => console.log(data)));
  }
}