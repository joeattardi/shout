import { loadingReducer } from './loading.reducer';
import { SearchUsers, SearchUsersSuccess, SearchUsersError } from '../../actions';

describe('Admin Users Loading Reducer', () => {
  it('should set the loading flag on SEARCH_USERS', () => {
    expect(loadingReducer(false, new SearchUsers('foo'))).toBe(true);
  });

  it('should clear the loading flag on SEARCH_USERS_SUCCESS', () => {
    expect(loadingReducer(true, new SearchUsersSuccess([], 0))).toBe(false);
  });

  it('should clear the loading flag on SEARCH_USERS_ERROR', () => {
    expect(loadingReducer(true, new SearchUsersError())).toBe(false);
  });
});
