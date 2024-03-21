import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileStore } from '@food-stories/users-client/profile/data-access';
import {
  AppState,
  selectCurrentUser,
} from '@food-stories/users-client/shared/app-init';
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
          this.profileStore.fetchUserDetails(routeUsername);
          this.profileStore.user$.subscribe((viewUser) => {
            if (viewUser.id) {
              this.isFollowing(user.id, viewUser.id).subscribe((res) => {
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

  isFollowing(followerId: string, followweeId: string) {
    return this.http.get<{isFollowing: boolean}>(
      'http://localhost:3000/api/v1/social-networks/' + followweeId,
      { params: { followerId } }
    );
  }
}
