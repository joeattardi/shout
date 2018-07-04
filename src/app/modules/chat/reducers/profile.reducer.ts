import { ProfileActionTypes, ProfileAction } from '../actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProfileState {
  loading: boolean;
  error: boolean;
  authError: boolean;
}

const initialState: ProfileState = {
  loading: false,
  error: false,
  authError: false
};

export const getLoading = (state: ProfileState) => state.loading;
export const getError = (state: ProfileState) => state.error;
export const getAuthError = (state: ProfileState) => state.authError;

export function profileReducer(state = initialState, action: ProfileAction): ProfileState {
  switch (action.type) {
    case ProfileActionTypes.SAVE_PROFILE:
      return {
        loading: true,
        error: false,
        authError: false
      };
    case ProfileActionTypes.SAVE_PROFILE_SUCCESS:
      return {
        loading: false,
        error: false,
        authError: false
      };
    case ProfileActionTypes.SAVE_PROFILE_ERROR:
      return {
        loading: false,
        error: true,
        authError: false
      };
    case ProfileActionTypes.SAVE_PROFILE_AUTH_ERROR:
      return {
        loading: false,
        error: false,
        authError: true
      };
    default:
      return state;
  }
}
