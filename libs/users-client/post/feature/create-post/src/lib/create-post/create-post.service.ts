import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Storage, getDownloadURL, ref } from "@angular/fire/storage";
import { IPost } from "@food-stories/common/typings";
import { API_ENDPOINTS, REF_PATHS } from "@food-stories/users-client/shared/config";
import { EMPTY, Observable, catchError, concatMap, delay, from, of, throwError } from "rxjs";

@Injectable({
  providedIn:  'root',
})
export class CreatePostService {
  http = inject(HttpClient);
  storage = inject(Storage);

  createPost(caption: string, userId: string) {
    return this.http.post<IPost>(API_ENDPOINTS.CREATE_POST, {caption, userId});
  }

  updatePostMediaUrls(postId: string, mediaUrls: string[], thumbnailUrl: string) {
    return this.http.put<IPost>(API_ENDPOINTS.UPDATE_MEDIA_URLS + postId, {mediaUrls, thumbnailUrl})
  }


  getDownloadURLWithRetry(
    postId: string,
    userId: string,
    attempts = 3,
    delayMs = 4000
  ): Observable<string> {
    const storageRef = ref(this.storage, REF_PATHS.getThumbPostPath(postId, userId))
    return from(getDownloadURL(storageRef)).pipe(
      catchError((error) => {
        if (error.code === 'storage/object-not-found' && attempts > 0) {
          return of(error).pipe(
            delay(delayMs),
            concatMap(() =>
              this.getDownloadURLWithRetry(postId, userId, attempts - 1, delayMs)
            )
          );
        }
        // handler error from getDownloadUrl function;
        return throwError(() => EMPTY);
      })
    );
  }
}