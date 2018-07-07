import { loadingReducer } from './loading.reducer';
import { LoadUsers, LoadUsersSuccess, LoadUsersError } from '../../actions';

describe('Admin Users Loading Reducer', () => {
  it('should set the loading flag on LOAD_USERS', () => {
    expect(loadingReducer(false, new LoadUsers())).toBe(true);
  });

  it('should clear the loading flag on LOAD_USERS_SUCCESS', () => {
    expect(loadingReducer(true, new LoadUsersSuccess([]))).toBe(false);
  });

  it('should clear the loading flag on LOAD_USERS_ERROR', () => {
    expect(loadingReducer(true, new LoadUsersError())).toBe(false);
  });
});
