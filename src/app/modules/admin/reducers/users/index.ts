import { combineReducers } from '@ngrx/store';

import { ConfirmDeleteModalState, deleteModalReducer } from './delete-modal.reducer';
import { EditUserState, editUserReducer } from './edit-user.reducer';
import { ErrorState, errorReducer } from './error.reducer';
import { LoadingState, loadingReducer } from './loading.reducer';
import { LoadingMoreState, loadingMoreReducer } from './loading-more.reducer';
import { UserListState, userListReducer } from './users.reducer';
import { SearchState, searchReducer } from './search.reducer';

export interface UsersState {
  users: UserListState;
  loading: LoadingState;
  loadingMore: LoadingMoreState;
  error: ErrorState;
  edit: EditUserState;
  confirmDeleteModal: ConfirmDeleteModalState;
  search: SearchState;
}

export const usersReducer = combineReducers({
  users: userListReducer,
  loading: loadingReducer,
  loadingMore: loadingMoreReducer,
  error: errorReducer,
  edit: editUserReducer,
  confirmDeleteModal: deleteModalReducer,
  search: searchReducer
});

export const getUserList = (state: UsersState) => state.users.users;
export const getUserListTotal = (state: UsersState) => state.users.total;
export const getUsersLoading = (state: UsersState) => state.loading;
export const getUsersLoadingMore = (state: UsersState) => state.loadingMore;
export const getUsersSearch = (state: UsersState) => state.search;
export const getUsersError = (state: UsersState) => state.error;
export const getConfirmDeleteModal = (state: UsersState) => state.confirmDeleteModal;
export const getUserEdit = (state: UsersState) => state.edit;
