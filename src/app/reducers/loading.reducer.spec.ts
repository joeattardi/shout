import { loadingReducer } from './loading.reducer';
import { GetCurrentUser, GetCurrentUserSuccess, GetCurrentUserError } from '../actions';

describe('App Loading Reducer', () => {
  it('should start loading on GET_CURRENT_USER', () => {
    const state = false;
    const newState = loadingReducer(state, new GetCurrentUser());
    expect(newState).toBe(true);
  });

  it('should stop loading on GET_CURRENT_USER_SUCCESS', () => {
    const state = true;
    const newState = loadingReducer(state, new GetCurrentUserSuccess({}));
    expect(newState).toBe(false);
  });

  it('should stop loading on GET_CURRENT_USER_ERROR', () => {
    const state = true;
    const newState = loadingReducer(state, new GetCurrentUserError());
    expect(newState).toBe(false);
  });
});
