import { UsersAction, UsersActionTypes } from '../../actions';

export type ErrorState = boolean;

const initialState: ErrorState = false;

export function errorReducer(state = initialState, action: UsersAction) {
  switch (action.type) {
    case UsersActionTypes.SEARCH_USERS:
    case UsersActionTypes.SEARCH_MORE_USERS:
    case UsersActionTypes.SEARCH_USERS_SUCCESS:
    case UsersActionTypes.SEARCH_MORE_USERS_SUCCESS:
      return false;

    case UsersActionTypes.SEARCH_USERS_ERROR:
    case UsersActionTypes.SEARCH_MORE_USERS_ERROR:
      return true;

    default:
      return state;
  }
}
