import { RoomsAction, RoomsActionTypes } from '../../actions';

export type LoadingState = boolean;

const initialState: LoadingState = false;

export function loadingReducer(state = initialState, action: RoomsAction): LoadingState {
  switch (action.type) {
    case RoomsActionTypes.SEARCH_ROOMS:
      return true;

    case RoomsActionTypes.SEARCH_ROOMS_SUCCESS:
    case RoomsActionTypes.SEARCH_ROOMS_ERROR:
      return false;

    default:
      return state;
  }
}
