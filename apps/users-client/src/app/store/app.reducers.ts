import { createReducer, on } from "@ngrx/store"
import { loadUserDetails, loadUserDetailsSuccess } from "./app.actions"

type InitialState = {
  loading: boolean,
  currentUser: {
    name: string,
    email: string,
  }
}

export const initialState:  InitialState = {
  loading: false,
  currentUser: {
    name: '', 
    email: '',
  }
}

export const appReducer = createReducer(
  initialState,
  on(loadUserDetails, (state) => {return state}),
  on(loadUserDetailsSuccess,( state) => {return state})

)