import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { API_ENDPOINTS } from "@food-stories/users-client/shared/config";

@Injectable({providedIn: 'root'})
export class LikesService {
  http = inject(HttpClient);

  isPostLiked(postId: string, userId: string) {
    return this.http.get<{isLiked: boolean}>(API_ENDPOINTS.Likes.isPostLiked(postId), {params: {userId}});
  }

  likeAPost(postId: string, userId: string) {
    return this.http.post(API_ENDPOINTS.Likes.likeAPost(postId) , {userId});
  }
  
  unlikeAPost(postId: string, userId: string) {
    return this.http.delete(API_ENDPOINTS.Likes.unlikeAPost(postId), {body: {userId}})
  }

}