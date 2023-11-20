import { IUser } from "@food-stories/common/typings";
import { createActionGroup, props } from "@ngrx/store";


export const AppActions = createActionGroup({
  source: 'app-init',
  events: {
  loadUserDetails: props<{email: string}>(),
  loadUserDetailsSuccess: props<IUser>(),
  }
})