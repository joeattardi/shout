import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { State as AppState } from '../../../reducers';

import { ProfileState, profileReducer, getLoading, getError, getAuthError } from './profile.reducer';
import { UserMenuState, userMenuReducer } from './user-menu.reducer';

export interface ChatState {
  profile: ProfileState;
  userMenuOpen: UserMenuState;
}

export interface State extends AppState {
  chat: ChatState;
}

export const reducers: ActionReducerMap<ChatState> = {
  profile: profileReducer,
  userMenuOpen: userMenuReducer
};

export const getChatState = createFeatureSelector<ChatState>('chat');

export const getProfileState = createSelector(getChatState, state => state.profile);
export const getProfileLoadingState = createSelector(getProfileState, getLoading);
export const getProfileErrorState = createSelector(getProfileState, getError);
export const getProfileAuthErrorState = createSelector(getProfileState, getAuthError);
