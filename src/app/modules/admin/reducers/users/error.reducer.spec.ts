import { errorReducer } from './error.reducer';
import { SearchUsers, SearchUsersSuccess, SearchUsersError } from '../../actions';

describe('Admin Users Error Reducer', () => {
  it('should clear the error flag on SEARCH_USERS', () => {
    expect(errorReducer(true, new SearchUsers('foo'))).toBe(false);
  });

  it('should clear the error flag on SEARCH_USERS_SUCCESS', () => {
    expect(errorReducer(true, new SearchUsersSuccess([], 0))).toBe(false);
  });

  it('should set the error flag on SEARCH_USERS_ERROR', () => {
    expect(errorReducer(false, new SearchUsersError())).toBe(true);
  });
});
