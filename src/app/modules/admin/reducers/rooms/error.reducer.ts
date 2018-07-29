import { RoomsAction, RoomsActionTypes } from '../../actions';

export type ErrorState = boolean;

const initialState: ErrorState = false;

export function errorReducer(state = initialState, action: RoomsAction) {
  switch (action.type) {
    case RoomsActionTypes.SEARCH_ROOMS:
    case RoomsActionTypes.SEARCH_ROOMS_SUCCESS:
      return false;

    case RoomsActionTypes.SEARCH_ROOMS_ERROR:
      return true;

    default:
      return state;
  }
}
