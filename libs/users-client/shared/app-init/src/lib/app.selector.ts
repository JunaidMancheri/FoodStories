import {  createFeatureSelector, createSelector } from '@ngrx/store'
import { AppState } from './app.reducers';


const selectCurrentUserFeature = createFeatureSelector<AppState>('app');


export const selectCurrentUser = createSelector(
  selectCurrentUserFeature,
  (state) => state.currentUser
);


export const selectCurrentUserIdOrUsername = createSelector(
  selectCurrentUserFeature,
  (state) => ({id :state.currentUser.id, username: state.currentUser.username})
)