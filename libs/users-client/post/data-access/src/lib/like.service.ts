import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IAddCommentRequest, IComment } from '@food-stories/common/typings';
import { API_ENDPOINTS } from '@food-stories/users-client/shared/config';

@Injectable({ providedIn: 'root' })
export class LikesService {
  http = inject(HttpClient);

  isPostLiked(postId: string, userId: string) {
    return this.http.get<{ isLiked: boolean }>(
      API_ENDPOINTS.Likes.isPostLiked(postId),
      { params: { userId } }
    );
  }

  likeAPost(data: {
    postId: string;
    userId: string;
    postOwnerId: string;
    likedUserUsername: string;
  }) {
    return this.http.post(API_ENDPOINTS.Likes.likeAPost(data.postId), {
      userId: data.userId,
      postOwnerId: data.postOwnerId,
      likedUserUsername: data.likedUserUsername,
    });
  }

  unlikeAPost(postId: string, userId: string) {
    return this.http.delete(API_ENDPOINTS.Likes.unlikeAPost(postId), {
      body: { userId },
    });
  }

  getComments(postId: string) {
    return this.http.get<{ comments: IComment[] }>(
      API_ENDPOINTS.Comments.getComments(postId)
    );
  }

  addComment(data: IAddCommentRequest) {
    return this.http.post<IComment>(
      API_ENDPOINTS.Comments.addComment(data.postId),
      {
        comment: data.comment,
        userId: data.userId,
        commentedUserUsername: data.commentedUserUsername,
        postOwnerId: data.postOwnerId,
      }
    );
  }
}
