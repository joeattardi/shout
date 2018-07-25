import { User } from '../../../core/core.types';
import { UsersAction, UsersActionTypes } from '../../actions';

export interface UserListState {
  users: User[];
  total: number;
}

const initialState: UserListState = {
  users: [],
  total: 0
};

export function userListReducer(state = initialState, action: UsersAction): UserListState {
  switch (action.type) {
    case UsersActionTypes.SEARCH_USERS:
      return {
        ...state,
        users: [],
        total: 0
      };

    case UsersActionTypes.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        total: action.total
      };

    case UsersActionTypes.SEARCH_USERS_ERROR:
      return {
        ...state,
        users: [],
        total: 0
      };

    case UsersActionTypes.SEARCH_MORE_USERS_SUCCESS:
      return {
        ...state,
        users: [...state.users, ...action.users],
        total: action.total
      };

    default:
      return state;
  }
}
