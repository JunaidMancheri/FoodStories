import { IUser } from "@food-stories/common/typings";
import { createAction, props } from "@ngrx/store";

export const loadUserDetails = createAction('[app-init] loadUserDetails', props<{email: string}>());
export const loadUserDetailsSuccess = createAction('[app-init] loadUserDetailsSucccess', props<IUser>())