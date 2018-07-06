import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { State as AppState } from '../../../reducers';

import { LoadingState, loadingReducer } from './loading.reducer';
import { UsersState, usersReducer, getUserList, getUsersLoading, getUsersError, getConfirmDeleteModal, getUserEdit } from './users';
import { getUser, getUserLoading, getUserError } from './users/edit-user.reducer';

export interface AdminState {
  loading: LoadingState;
  users: UsersState;
}

export interface State extends AppState {
  admin: AdminState;
}

export const reducers: ActionReducerMap<AdminState> = {
  loading: loadingReducer,
  users: usersReducer
};

export const getAdminState = createFeatureSelector<AdminState>('admin');

export const getUsersState = createSelector(getAdminState, state => state.users);
export const getUserListState = createSelector(getUsersState, getUserList);
export const getUsersLoadingState = createSelector(getUsersState, getUsersLoading);
export const getUsersErrorState = createSelector(getUsersState, getUsersError);
export const getUsersDeleteModalState = createSelector(getUsersState, getConfirmDeleteModal);

export const getUserEditState = createSelector(getUsersState, getUserEdit);
export const getEditedUserState = createSelector(getUserEditState, getUser);
export const getUserEditLoadingState = createSelector(getUserEditState, getUserLoading);
export const getUserEditErrorState = createSelector(getUserEditState, getUserError);

export const getLoadingState = createSelector(getAdminState, state => state.loading);
