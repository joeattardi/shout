import { errorReducer } from './error.reducer';
import { LoadUsers, LoadUsersSuccess, LoadUsersError } from '../../actions';

describe('Admin Users Error Reducer', () => {
  it('should clear the error flag on LOAD_USERS', () => {
    expect(errorReducer(true, new LoadUsers())).toBe(false);
  });

  it('should clear the error flag on LOAD_USERS_SUCCESS', () => {
    expect(errorReducer(true, new LoadUsersSuccess([]))).toBe(false);
  });

  it('should set the error flag on LOAD_USERS_ERROR', () => {
    expect(errorReducer(false, new LoadUsersError())).toBe(true);
  });
});
