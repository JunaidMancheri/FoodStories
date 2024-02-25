import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { IPost } from "@food-stories/common/typings";
import { API_ENDPOINTS } from "@food-stories/users-client/shared/config";

@Injectable({
  providedIn:  'root',
})
export class CreatePostService {
  http = inject(HttpClient);

  createPost(caption: string, userId: string) {
    return this.http.post<IPost>(API_ENDPOINTS.CREATE_POST, {caption, userId});
  }

  updatePostMediaUrls(postId: string, mediaUrls: string[]) {
    return this.http.put(API_ENDPOINTS.UPDATE_MEDIA_URLS + postId, {mediaUrls})
  }
}