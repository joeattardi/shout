import { createFeatureSelector } from '@ngrx/store';

import { User } from '../modules/core/core.types';
import { UserActionTypes } from '../actions';

const initialState: User = null;

export type State = User;

export const getUserState = createFeatureSelector<State>('user');

export function userReducer(state: State = initialState, action): State {
  switch (action.type) {
    case UserActionTypes.GET_CURRENT_USER_SUCCESS:
      return action.user;
    case UserActionTypes.UPDATE_CURRENT_USER:
      return {
        ...state,
        ...action.user
      };
    case UserActionTypes.GET_CURRENT_USER_ERROR:
      return null;
    default:
      return state;
  }
}
