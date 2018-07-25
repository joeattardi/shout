import { UsersAction, UsersActionTypes } from '../../actions';

export type LoadingState = boolean;

const initialState: LoadingState = false;

export function loadingReducer(state = initialState, action: UsersAction): LoadingState {
  switch (action.type) {
    case UsersActionTypes.SEARCH_USERS:
      return true;

    case UsersActionTypes.SEARCH_USERS_SUCCESS:
    case UsersActionTypes.SEARCH_USERS_ERROR:
      return false;

    default:
      return state;
  }
}
