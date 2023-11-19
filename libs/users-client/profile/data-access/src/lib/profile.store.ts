import { IUser } from '@food-stories/common/typings';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable, catchError, map, switchMap } from 'rxjs';
import { ProfileHttpService } from '@food-stories/users-client/shared/data-access';
import { Injectable} from '@angular/core';


export  interface ProfileState  {
  user: IUser
}

@Injectable()
export class ProfileStore extends ComponentStore<ProfileState>  {
  constructor(private http: ProfileHttpService) {
    super({user: {} as IUser})
  }

  readonly fetchUserDetails = this.effect((username$: Observable<string>) => {
    return username$.pipe(
      switchMap(
        (username) => this.http.getUserData(username)
        .pipe(
          map(user => this.loadUser(user)),
          catchError(() => EMPTY)
          )
        )
    )
  })

  readonly user$ = this.select((state) => state.user)

  readonly loadUser = this.updater((state, user:IUser) => ({...state, user}))
}