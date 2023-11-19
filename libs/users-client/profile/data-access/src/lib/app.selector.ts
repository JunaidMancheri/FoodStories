import { IUser } from '@food-stories/common/typings';
import {  createFeatureSelector, createSelector } from '@ngrx/store'

export interface AppState {
  user: IUser
}

const selectCurrentUserFeature = createFeatureSelector<IUser>('user');


export const selectCurrentUser = createSelector(
  selectCurrentUserFeature,
  (state) => state
);