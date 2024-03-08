import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppActions} from "./app.actions";
import { EMPTY, catchError, exhaustMap, map } from "rxjs";
import { Injectable } from "@angular/core";
import { ProfileHttpService } from "@food-stories/users-client/shared/data-access";

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private httpService: ProfileHttpService) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loadUserDetails),
      exhaustMap((action) => {
         return this.httpService.getCurrentUserData(action.email)
         .pipe(
          map(userData => AppActions.loadUserDetailsSuccess(userData)),
          catchError(() => EMPTY)

         )
      })
    )
  })
}