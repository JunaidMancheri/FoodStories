import { EditProfileData, IPost, IUser } from '@food-stories/common/typings';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable, catchError, map, switchMap } from 'rxjs';
import { ProfileHttpService } from '@food-stories/users-client/shared/data-access';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions } from '@food-stories/users-client/shared/app-init';
import { Location } from '@angular/common';
import { ProfileStoreService } from './profile-store.service';

export interface ProfileState {
  user: IUser;
  posts: IPost[];
}

@Injectable({
  providedIn: 'root',
})
export class ProfileStore extends ComponentStore<ProfileState> {
  constructor(
    private http: ProfileHttpService,
    private store: Store,
    private location: Location,
    private profileStoreService: ProfileStoreService
  ) {
    super({ user: {} as IUser, posts: [] as IPost[] });
  }

  readonly user$ = this.select((state) => state.user);
  readonly posts$ = this.select((state) => state.posts);

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

  readonly fetchUsersPosts = this.effect((userId$: Observable<string>) => {
    return userId$.pipe(
      switchMap((userId) =>
        this.profileStoreService.getUsersPosts(userId).pipe(
          map((posts) => this.loadPosts(posts)),
          catchError(() => EMPTY)
        )
      )
    );
  });

  readonly addNewFollower = this.updater((state) => ({
    ...state,
    user: {
      ...state.user,
      followersCount: ++state.user.followersCount,
    }
  }))

  readonly removeFollower = this.updater((state) => ({
    ...state,
    user: {
      ...state.user,
      followersCount: --state.user.followersCount,
    }
  }))

  readonly loadPosts = this.updater((state, posts: IPost[]) => ({
    ...state,
    posts,
  }));

  readonly addNewPost = this.updater((state, post: IPost) => ({
    ...state,
    user: {
      ...state.user,
      postsCount: state.user.postsCount + 1,
    },
    posts: [post, ...state.posts]
  }))

  readonly loadUser = this.updater(
    (state, user: IUser) => (
      this.fetchUsersPosts(user.id),
      {
        ...state,
        user,
      }
    )
  );
}
