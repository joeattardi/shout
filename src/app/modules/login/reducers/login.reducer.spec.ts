import { loginReducer } from './login.reducer';
import { Login, LoginAuthError, LoginError, LoginSuccess } from '../actions/login.actions';

describe('Login Reducer', () => {
  it('should set the loading flag on LOGIN', () => {
    const state = {
      loading: false,
      error: false,
      authError: false
    };
    const newState = loginReducer(state, new Login('foo', 'bar'));
    expect(newState).toEqual({
      loading: true,
      error: false,
      authError: false
    });
  });

  it('should set the authError flag on LOGIN_AUTH_ERROR', () => {
    const state = {
      loading: true,
      error: false,
      authError: false
    };
    const newState = loginReducer(state, new LoginAuthError());
    expect(newState).toEqual({
      loading: false,
      error: false,
      authError: true
    });
  });

  it('should set the error flag on LOGIN_ERROR', () => {
    const state = {
      loading: true,
      error: false,
      authError: false
    };
    const newState = loginReducer(state, new LoginError());
    expect(newState).toEqual({
      loading: false,
      error: true,
      authError: false
    });
  });

  it('should clear all flags on LOGIN_SUCCESS', () => {
    const state = {
      loading: true,
      error: true,
      authError: true
    };
    const newState = loginReducer(state, new LoginSuccess({}));
    expect(newState).toEqual({
      loading: false,
      error: false,
      authError: false
    });
  });
});
