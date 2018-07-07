import { userReducer } from './user.reducer';
import { GetCurrentUserSuccess, UpdateCurrentUser, GetCurrentUserError, LogOut } from '../actions';

describe('App User Reducer', () => {
  it('should set the user on GET_CURRENT_USER_SUCCESS', () => {
    const state = null;
    const user = {
      username: 'foo'
    };
    const newState = userReducer(state, new GetCurrentUserSuccess(user));
    expect(newState).toEqual(user);
  });

  it('should update the user on UPDATE_CURRENT_USER', () => {
    const state = {
      username: 'foo'
    };
    const newState = userReducer(state, new UpdateCurrentUser({ firstName: 'Foo', lastName: 'Bar' }));
    expect(newState).toEqual({
      username: 'foo',
      firstName: 'Foo',
      lastName: 'Bar'
    });
  });

  it('should clear the user on GET_CURRENT_USER_ERROR', () => {
    const state = {
      username: 'foo'
    };
    const newState = userReducer(state, new GetCurrentUserError());
    expect(newState).toBe(null);
  });

  it('should clear the user when logging out', () => {
    const state = {
      username: 'foo'
    };
    const newState = userReducer(state, new LogOut());
    expect(newState).toBe(null);
  });
});
