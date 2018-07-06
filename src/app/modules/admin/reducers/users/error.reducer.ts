import { UsersAction, UsersActionTypes } from '../../actions';

export type ErrorState = boolean;

const initialState: ErrorState = false;

export function errorReducer(state = initialState, action: UsersAction) {
  switch (action.type) {
    case UsersActionTypes.LOAD_USERS:
    case UsersActionTypes.LOAD_USERS_SUCCESS:
      return false;

    case UsersActionTypes.LOAD_USERS_ERROR:
      return true;

    default:
      return state;
  }
}
