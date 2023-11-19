import { createReducer, on } from "@ngrx/store"
import { loadUserDetails, loadUserDetailsSuccess } from "./app.actions"
import { IUser } from '@food-stories/common/typings'


type InitialState = {
  loading: boolean,
  currentUser: IUser
}

export const initialState:  InitialState = {
  loading: false,
  currentUser:{} as IUser
}

export const appReducer = createReducer(
  initialState,
  on(loadUserDetails, (state) => {return state}),
  on(loadUserDetailsSuccess,( state, props) =>  ({...state,currentUser: props}))
)