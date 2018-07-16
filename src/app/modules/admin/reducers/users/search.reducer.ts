import { UsersAction, UsersActionTypes } from '../../actions';

export type SearchState = string;

const initialState: SearchState = '';

export function searchReducer(state = initialState, action: UsersAction): SearchState {
  switch (action.type) {
    case UsersActionTypes.SEARCH_USERS:
      return action.searchTerm;
    default:
      return state;
  }
}
