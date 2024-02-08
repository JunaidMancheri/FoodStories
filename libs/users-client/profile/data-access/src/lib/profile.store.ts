import { EditProfileData, IUser } from '@food-stories/common/typings';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable, catchError, map, switchMap } from 'rxjs';
import { ProfileHttpService } from '@food-stories/users-client/shared/data-access';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions } from '@food-stories/users-client/shared/app-init';
import { Location } from '@angular/common';

export interface ProfileState {
  user: IUser;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileStore extends ComponentStore<ProfileState> {
  constructor(
    private http: ProfileHttpService,
    private store: Store,
    private location: Location,
  ) {
    super({ user: {} as IUser });
  }

  readonly user$ = this.select((state) => state.user);

  readonly fetchUserDetails = this.effect((username$: Observable<string>) => {
    return username$.pipe(
      switchMap((username) =>
        this.http.getUserData(username).pipe(
          map((user) => this.loadUser(user)),
          catchError(() => EMPTY)
        )
      )
    );
  });

  readonly persistEditsToServer = this.effect(
    (edits$: Observable<EditProfileData>) => {
      return edits$.pipe(
        switchMap((edits) =>
          this.http.updateUserProfile(edits).pipe(
            map(
              (user) => (
                this.location.replaceState(edits.username),
                this.store.dispatch(AppActions.loadUserDetailsSuccess(user)),
                this.loadUser(user)
              )
            ),
            catchError(() => EMPTY)
          )
        )
      );
    }
  );

  readonly updateUserProfile = this.updater(
    (state, updates: EditProfileData) => ({
      ...state,
      user: {
        ...state.user,
        profile: { bio: updates.bio, gender: updates.gender },
        DPURL: updates.DPURL,
        name: updates.name,
        username: updates.username,
      },
    })
  );

  readonly loadUser = this.updater((state, user: IUser) => ({
    ...state,
    user,
  }));
}
