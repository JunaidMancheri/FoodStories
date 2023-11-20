import {  createFeatureSelector, createSelector } from '@ngrx/store'
import { AppState } from './app.reducers';


const selectCurrentUserFeature = createFeatureSelector<AppState>('app');


export const selectCurrentUser = createSelector(
  selectCurrentUserFeature,
  (state) => state.currentUser
);