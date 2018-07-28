import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { State as AppState } from '../../../reducers';

import { LoadingState, loadingReducer } from './loading.reducer';
import {
  UsersState,
  usersReducer,
  getUserList,
  getUsersLoading,
  getUsersError,
  getConfirmDeleteModal,
  getUserEdit,
  getUsersSearch,
  getUserListTotal,
  getUsersLoadingMore
} from './users';

import { roomsReducer, RoomsState, getRoomList, getRoomListTotal, getRoomsLoading } from './rooms';

import { getUser, getUserLoading, getUserError } from './users/edit-user.reducer';

export interface AdminState {
  loading: LoadingState;
  users: UsersState;
  rooms: RoomsState;
}

export interface State extends AppState {
  admin: AdminState;
}

export const reducers: ActionReducerMap<AdminState> = {
  loading: loadingReducer,
  users: usersReducer,
  rooms: roomsReducer
};

export const getAdminState = createFeatureSelector<AdminState>('admin');

export const getUsersState = createSelector(getAdminState, state => state.users);
export const getUserListState = createSelector(getUsersState, getUserList);
export const getUserListTotalState = createSelector(getUsersState, getUserListTotal);
export const getUsersLoadingState = createSelector(getUsersState, getUsersLoading);
export const getUsersLoadingMoreState = createSelector(getUsersState, getUsersLoadingMore);
export const getUsersSearchState = createSelector(getUsersState, getUsersSearch);
export const getUsersErrorState = createSelector(getUsersState, getUsersError);
export const getUsersDeleteModalState = createSelector(getUsersState, getConfirmDeleteModal);

export const getRoomsState = createSelector(getAdminState, state => state.rooms);
export const getRoomListState = createSelector(getRoomsState, getRoomList);
export const getRoomListTotalState = createSelector(getRoomsState, getRoomListTotal);
export const getRoomsLoadingState = createSelector(getRoomsState, getRoomsLoading);

export const getUserEditState = createSelector(getUsersState, getUserEdit);
export const getEditedUserState = createSelector(getUserEditState, getUser);
export const getUserEditLoadingState = createSelector(getUserEditState, getUserLoading);
export const getUserEditErrorState = createSelector(getUserEditState, getUserError);

export const getLoadingState = createSelector(getAdminState, state => state.loading);
