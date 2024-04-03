import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IisFollowingResponse } from '@food-stories/common/typings';
import { ProfileStore } from '@food-stories/users-client/profile/data-access';
import {
  AppState,
  selectCurrentUser,
} from '@food-stories/users-client/shared/app-init';
import { API_ENDPOINTS } from '@food-stories/users-client/shared/config';
import { Store } from '@ngrx/store';
import { BehaviorSubject, skipWhile, take } from 'rxjs';

@Injectable()
export class ProfileService {
  constructor(
    private store: Store<AppState>,
    private profileStore: ProfileStore,
    private http: HttpClient
  ) {}

  private isOwnPropertySubject$ = new BehaviorSubject<boolean>(false);
  readonly isOwnProfile$ = this.isOwnPropertySubject$.asObservable();

  private isFollowingSubject$ = new BehaviorSubject<boolean>(false);
  readonly isFollowing$ = this.isFollowingSubject$.asObservable();

  private isBlockedSubject$ = new BehaviorSubject<boolean>(false);
  readonly isBlocked$ = this.isBlockedSubject$.asObservable();

  loadUserDetails(routeUsername: string) {
    this.store
      .select(selectCurrentUser)
      .pipe(
        skipWhile((user) => !user.username),
        take(1)
      )
      .subscribe((user) => {
        const currentUserUsername = user.username;
        if (currentUserUsername !== routeUsername) {
          this.profileStore.fetchUserDetails({userId: user.id, username: routeUsername});
          this.profileStore.user$.subscribe((viewUser) => {
            if (viewUser.id) {
              this.isFollowing(user.id, viewUser.id).subscribe((res) => {
                if (res.isBlocked) {
                  this.isBlockedSubject$.next(true)
                } else {
                  this.isBlockedSubject$.next(false);
                }

                if(res.isFollowing) {
                  this.isFollowingSubject$.next(true);
                }
                else {
                  this.isFollowingSubject$.next(false);
                }
              })
            }
          })
          this.isOwnPropertySubject$.next(false);
        } else {
          this.isOwnPropertySubject$.next(true);
          this.profileStore.loadUser(user);
        }
      });
  }

  blockUser() {
    this.isBlockedSubject$.next(true);
    this.isFollowingSubject$.next(false);
  }

  unblockUser() {
    this.isBlockedSubject$.next(false);
  }

  isFollowing(followerId: string, followweeId: string) {
    return this.http.get<IisFollowingResponse>(
      API_ENDPOINTS.SocialNetworks.getRelationships(followweeId),
      { params: { followerId } }
    );
  }
}
