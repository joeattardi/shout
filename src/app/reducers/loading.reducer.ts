import { createFeatureSelector } from '@ngrx/store';
import { UserActionTypes } from '../actions';

const initialState = false;

export type State = boolean;

export const getLoadingState = createFeatureSelector<State>('loading');

export function loadingReducer(state: State = initialState, action): State {
  switch (action.type) {
    case UserActionTypes.GET_CURRENT_USER:
      return true;
    case UserActionTypes.GET_CURRENT_USER_SUCCESS:
    case UserActionTypes.GET_CURRENT_USER_ERROR:
      return false;
    default:
      return state;
  }
}
