import { userListReducer } from './users.reducer';
import { LoadUsersSuccess, LoadUsersError } from '../../actions';

describe('Admin Users User List Reducer', () => {
  const users = [
    {
      username: 'joe'
    },
    {
      username: 'bill'
    }
  ];

  it('should set the users array on LOAD_USERS_SUCCESS', () => {
    const newState = userListReducer([], new LoadUsersSuccess(users));
    expect(newState).toEqual(users);
  });

  it('should set an empty array on LOAD_USERS_ERROR', () => {
    expect(userListReducer(users, new LoadUsersError())).toEqual([]);
  });
});
