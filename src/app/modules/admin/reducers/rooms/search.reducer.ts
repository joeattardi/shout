import { RoomsAction, RoomsActionTypes } from '../../actions';

export type SearchState = string;

const initialState: SearchState = '';

export function searchReducer(state = initialState, action: RoomsAction): SearchState {
  switch (action.type) {
    case RoomsActionTypes.SEARCH_ROOMS:
      return action.searchTerm;
    default:
      return state;
  }
}
