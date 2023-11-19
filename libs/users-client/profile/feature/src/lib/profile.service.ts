import { Injectable } from '@angular/core';
import {
  AppState,
  ProfileStore,
  selectCurrentUser,
} from '@food-stories/users-client/profile/data-access';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  skipWhile,
  take,
} from 'rxjs';

@Injectable()
export class ProfileService {
  constructor(
    private store: Store<AppState>,
    private profileStore: ProfileStore
  ) {}

  private isOwnPropertySubject$ = new BehaviorSubject<boolean>(false);
  readonly isOwnProfile$ = this.isOwnPropertySubject$.asObservable();

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
        } else {
          this.isOwnPropertySubject$.next(true);
          this.isOwnPropertySubject$.complete();
          this.profileStore.loadUser(user);
        }
      });
  }
}
