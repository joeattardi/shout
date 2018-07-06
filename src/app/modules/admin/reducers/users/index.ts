import { ActionReducerMap, combineReducers } from '@ngrx/store';

import { ConfirmDeleteModalState, deleteModalReducer } from './delete-modal.reducer';
import { EditUserState, editUserReducer } from './edit-user.reducer';
import { ErrorState, errorReducer } from './error.reducer';
import { LoadingState, loadingReducer } from './loading.reducer';
import { UserListState, userListReducer } from './users.reducer';

export interface UsersState {
  users: UserListState;
  loading: LoadingState;
  error: ErrorState;
  edit: EditUserState;
  confirmDeleteModal: ConfirmDeleteModalState;
}

export const usersReducer = combineReducers({
  users: userListReducer,
  loading: loadingReducer,
  error: errorReducer,
  edit: editUserReducer,
  confirmDeleteModal: deleteModalReducer
});

export const getUserList = (state: UsersState) => state.users;
export const getUsersLoading = (state: UsersState) => state.loading;
export const getUsersError = (state: UsersState) => state.error;
export const getConfirmDeleteModal = (state: UsersState) => state.confirmDeleteModal;
export const getUserEdit = (state: UsersState) => state.edit;
