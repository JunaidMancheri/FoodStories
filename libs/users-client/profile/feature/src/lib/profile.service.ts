import { Injectable } from '@angular/core';
import { ProfileStore } from '@food-stories/users-client/profile/data-access';
import {
  AppState,
  selectCurrentUser,
} from '@food-stories/users-client/shared/app-init';
import { Store } from '@ngrx/store';
import { BehaviorSubject, skipWhile ,take } from 'rxjs';

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
          this.profileStore.loadUser(user);
        }
      });
  }
}
