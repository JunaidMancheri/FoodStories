import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadUserDetails, loadUserDetailsSuccess } from "./app.actions";
import { EMPTY, catchError, exhaustMap, map } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";

@Injectable()
export class AppInitEffects {
  constructor(private actions$: Actions, private httpService: HttpService) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUserDetails),
      exhaustMap((action) => {
         return this.httpService.getUserData(action.email)
         .pipe(
          map(userData => {console.log(userData); return loadUserDetailsSuccess()}),
          catchError(() => EMPTY)

         )
      })
    )
  })
}