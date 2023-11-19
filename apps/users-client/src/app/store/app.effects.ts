import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadUserDetails, loadUserDetailsSuccess } from "./app.actions";
import { EMPTY, catchError, exhaustMap, map } from "rxjs";
import { Injectable } from "@angular/core";
import { ProfileHttpService } from "@food-stories/users-client/shared/data-access";

@Injectable()
export class AppInitEffects {
  constructor(private actions$: Actions, private httpService: ProfileHttpService) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUserDetails),
      exhaustMap((action) => {
         return this.httpService.getCurrentUserData(action.email)
         .pipe(
          map(userData => loadUserDetailsSuccess(userData)),
          catchError(() => EMPTY)

         )
      })
    )
  })
}