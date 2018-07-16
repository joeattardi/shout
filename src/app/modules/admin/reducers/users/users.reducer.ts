import { User } from '../../../core/core.types';
import { UsersAction, UsersActionTypes } from '../../actions';

export type UserListState = User[];

const initialState: UserListState = [];

export function userListReducer(state = initialState, action: UsersAction): UserListState {
  switch (action.type) {
    case UsersActionTypes.LOAD_USERS_SUCCESS:
    case UsersActionTypes.SEARCH_USERS_SUCCESS:
      return action.users;

    case UsersActionTypes.LOAD_USERS_ERROR:
    case UsersActionTypes.SEARCH_USERS_ERROR:
      return [];

    default:
      return state;
  }
}
