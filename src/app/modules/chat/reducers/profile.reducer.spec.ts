import { profileReducer } from './profile.reducer';
import { SaveProfile, SaveProfileSuccess, SaveProfileError, SaveProfileAuthError } from '../actions';

describe('Profile Reducer', () => {
  it('should set the loading flag on SAVE_PROFILE', () => {
    const state = {
      loading: false,
      error: false,
      authError: false
    };
    const newState = profileReducer(
      state,
      new SaveProfile({
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'foo@bar.com',
        currentPassword: 'foobar123',
        newPassword: 'foobar123'
      })
    );
    expect(newState).toEqual({
      loading: true,
      error: false,
      authError: false
    });
  });

  it('should clear all flags on SAVE_PROFILE_SUCCESS', () => {
    const state = {
      loading: true,
      error: false,
      authError: false
    };
    const newState = profileReducer(
      state,
      new SaveProfileSuccess({
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'foo@bar.com',
        currentPassword: 'foobar123',
        newPassword: 'foobar123'
      })
    );
    expect(newState).toEqual({
      loading: false,
      error: false,
      authError: false
    });
  });

  it('should set the error flag on SAVE_PROFILE_ERROR', () => {
    const state = {
      loading: true,
      error: false,
      authError: false
    };
    const newState = profileReducer(state, new SaveProfileError());
    expect(newState).toEqual({
      loading: false,
      error: true,
      authError: false
    });
  });

  it('should set the authError flag on SAVE_PROFILE_AUTH_ERROR', () => {
    const state = {
      loading: true,
      error: false,
      authError: false
    };
    const newState = profileReducer(state, new SaveProfileAuthError());
    expect(newState).toEqual({
      loading: false,
      error: false,
      authError: true
    });
  });
});
