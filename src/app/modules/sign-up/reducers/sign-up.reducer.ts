import { SignUpActionTypes, SignUpAction } from '../actions/sign-up.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface SignUpState {
  loading: boolean;
  error: boolean;
}

const initialState: SignUpState = {
  loading: false,
  error: false
};

export const getSignUpState = createFeatureSelector<SignUpState>('signUp');
export const getLoadingState = createSelector(getSignUpState, state => state.loading);
export const getErrorState = createSelector(getSignUpState, state => state.error);

export function signUpReducer(state = initialState, action: SignUpAction): SignUpState {
  switch (action.type) {
    case SignUpActionTypes.SIGN_UP:
      return {
        loading: true,
        error: false
      };
    case SignUpActionTypes.SIGN_UP_SUCCESS:
      return {
        loading: false,
        error: false
      };
    case SignUpActionTypes.SIGN_UP_ERROR:
      return {
        loading: false,
        error: true
      };
    default:
      return state;
  }
}
