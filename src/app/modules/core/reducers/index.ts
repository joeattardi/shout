import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { State as AppState } from '../../../reducers';
import { NotificationState, notificationReducer } from './notification.reducer';

export * from './notification.reducer';

export interface CoreState {
  notifications: NotificationState;
}

export interface State extends AppState {
  core: CoreState;
}

export const reducers: ActionReducerMap<CoreState> = {
  notifications: notificationReducer
};

export const getCoreState = createFeatureSelector<CoreState>('core');

export const getNotificationState = createSelector(getCoreState, state => state.notifications);
