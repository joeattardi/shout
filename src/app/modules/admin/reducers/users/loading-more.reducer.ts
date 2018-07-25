import { UsersAction, UsersActionTypes } from '../../actions';

export type LoadingMoreState = boolean;

const initialState: LoadingMoreState = false;

export function loadingMoreReducer(state = initialState, action: UsersAction): LoadingMoreState {
  switch (action.type) {
    case UsersActionTypes.SEARCH_MORE_USERS:
      return true;

    case UsersActionTypes.SEARCH_MORE_USERS_SUCCESS:
    case UsersActionTypes.SEARCH_MORE_USERS_ERROR:
      return false;

    default:
      return state;
  }
}
