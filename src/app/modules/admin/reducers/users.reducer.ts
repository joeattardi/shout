import { User } from '../../core/core.types';
import { UsersActionTypes, UsersAction } from '../actions';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: boolean;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: false
};

export function usersReducer(state = initialState, action: UsersAction): UsersState {
  switch (action.type) {
    case UsersActionTypes.LOAD_USERS:
      return {
        ...state,
        loading: true
      };
    case UsersActionTypes.LOAD_USERS_SUCCESS:
      return {
        users: action.users,
        loading: false,
        error: false
      };
    case UsersActionTypes.LOAD_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}

export function getUserList(state: UsersState) {
  return state.users;
}

export function getUsersLoading(state: UsersState) {
  return state.loading;
}

export function getUsersError(state: UsersState) {
  return state.error;
}
