import { editUserReducer } from './edit-user.reducer';
import { LoadUser, LoadUserSuccess, LoadUserError, SaveUser, SaveUserError, SaveUserSuccess, CreateUser } from '../../actions';

describe('Admin Edit User Reducer', () => {
  const user = {
    firstName: 'Foo',
    lastName: 'Bar',
    username: 'foobar'
  };

  it('should set the loading flag on LOAD_USER', () => {
    const state = {
      user: null,
      loading: false,
      error: false
    };
    const newState = editUserReducer(state, new LoadUser(1));
    expect(newState).toEqual({
      user: null,
      loading: true,
      error: false
    });
  });

  it('should set the user and clear the loading flag on LOAD_USER_SUCCESS', () => {
    const state = {
      user: null,
      loading: true,
      error: false
    };
    const newState = editUserReducer(state, new LoadUserSuccess(user));
    expect(newState).toEqual({
      user,
      loading: false,
      error: false
    });
  });

  it('should set the error flag on LOAD_USER_ERROR', () => {
    const state = {
      user: null,
      loading: true,
      error: false
    };
    const newState = editUserReducer(state, new LoadUserError());
    expect(newState).toEqual({
      user: null,
      loading: false,
      error: true
    });
  });

  it('should set the loading flag on SAVE_USER', () => {
    const state = {
      user,
      loading: false,
      error: false
    };
    const newState = editUserReducer(state, new SaveUser(1, user));
    expect(newState).toEqual({
      user,
      loading: true,
      error: false
    });
  });

  it('should clear the user and all flags on SAVE_USER_SUCCESS', () => {
    const state = {
      user,
      loading: true,
      error: false
    };
    const newState = editUserReducer(state, new SaveUserSuccess(user));
    expect(newState).toEqual({
      user: null,
      loading: false,
      error: false
    });
  });

  it('should keep the user and set the error flag on SAVE_USER_ERROR', () => {
    const state = {
      user,
      loading: true,
      error: false
    };
    const newState = editUserReducer(state, new SaveUserError());
    expect(newState).toEqual({
      user,
      loading: false,
      error: true
    });
  });

  it('should set an empty user on CREATE_USER', () => {
    const state = {
      user: null,
      loading: false,
      error: false
    };
    const newState = editUserReducer(state, new CreateUser());
    expect(newState).toEqual({
      user: {
        admin: false
      },
      loading: false,
      error: false
    });
  });
});
