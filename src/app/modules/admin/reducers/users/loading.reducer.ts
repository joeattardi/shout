import { UsersAction, UsersActionTypes } from '../../actions';

export type LoadingState = boolean;

const initialState: LoadingState = false;

export function loadingReducer(state = initialState, action: UsersAction): LoadingState {
  switch (action.type) {
    case UsersActionTypes.LOAD_USERS:
    case UsersActionTypes.SEARCH_USERS:
      return true;

    case UsersActionTypes.LOAD_USERS_SUCCESS:
    case UsersActionTypes.LOAD_USERS_ERROR:
    case UsersActionTypes.SEARCH_USERS_SUCCESS:
    case UsersActionTypes.SEARCH_USERS_ERROR:
      return false;

    default:
      return state;
  }
}
