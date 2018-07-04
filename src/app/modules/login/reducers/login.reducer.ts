import { LoginActionTypes, LoginAction } from '../actions/login.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State as AppState } from '../../../reducers';

export interface LoginState {
  loading: boolean;
  error: boolean;
  authError: boolean;
}

export interface State extends AppState {
  login: LoginState;
}

const initialState: LoginState = {
  loading: false,
  error: false,
  authError: false
};

export const getLoginState = createFeatureSelector<LoginState>('login');
export const getLoadingState = createSelector(getLoginState, state => state.loading);
export const getErrorState = createSelector(getLoginState, state => state.error);
export const getAuthErrorState = createSelector(getLoginState, state => state.authError);

export function loginReducer(state = initialState, action: LoginAction): LoginState {
  switch (action.type) {
    case LoginActionTypes.LOGIN:
      return {
        loading: true,
        error: false,
        authError: false
      };
    case LoginActionTypes.LOGIN_AUTH_ERROR:
      return {
        loading: false,
        error: false,
        authError: true
      };
    case LoginActionTypes.LOGIN_ERROR:
      return {
        loading: false,
        error: true,
        authError: false
      };
    case LoginActionTypes.LOGIN_SUCCESS:
      return {
        loading: false,
        error: false,
        authError: false
      };
    default:
      return state;
  }
}
