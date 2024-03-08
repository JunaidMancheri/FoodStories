import { createReducer, on } from "@ngrx/store"
import { AppActions } from "./app.actions"
import { IUser } from '@food-stories/common/typings'


export interface AppState {
  currentUser: IUser
}


export const initialState:  AppState = {
  currentUser:{} as IUser
}

export const appReducer = createReducer(
  initialState,
  on(AppActions.loadUserDetails, (state) => {return state}),
  on(AppActions.loadUserDetailsSuccess,( state, props) =>  ({...state,currentUser: props})),
  on(AppActions.logoutUser, () => ({currentUser: {} as IUser} ) )
)