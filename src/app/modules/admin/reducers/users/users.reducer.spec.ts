import { userListReducer } from './users.reducer';
import { SearchUsersSuccess, SearchUsersError, SearchUsers, SearchMoreUsers, SearchMoreUsersSuccess } from '../../actions';

describe('Admin Users User List Reducer', () => {
  const users = [
    {
      username: 'joe'
    },
    {
      username: 'bill'
    }
  ];

  it('should clear the users array on SEARCH_USERS', () => {
    const newState = userListReducer(
      {
        users,
        total: 2
      },
      new SearchUsers('foo')
    );

    expect(newState.users).toEqual([]);
  });

  it('should set the users array and total on SEARCH_USERS_SUCCESS', () => {
    const newState = userListReducer(
      {
        users: [],
        total: 0
      },
      new SearchUsersSuccess(users, 2)
    );

    expect(newState.users).toEqual(users);
    expect(newState.total).toEqual(2);
  });

  it('should clear the users array on SEARCH_USERS_ERROR', () => {
    const newState = userListReducer(
      {
        users,
        total: 2
      },
      new SearchUsersError()
    );

    expect(newState.users).toEqual([]);
    expect(newState.total).toEqual(0);
  });

  it('should update the offset on SEARCH_MORE_USERS', () => {
    const newState = userListReducer(
      {
        users,
        total: 4
      },
      new SearchMoreUsers('foo', 2)
    );

    expect(newState.users).toEqual(users);
    expect(newState.total).toEqual(4);
  });

  it('should add the newly found users to the users on SEARCH_MORE_USERS_SUCCESS', () => {
    const newState = userListReducer(
      {
        users,
        total: 3
      },
      new SearchMoreUsersSuccess([{ username: 'foo' }], 3)
    );

    expect(newState.users).toEqual([...users, { username: 'foo' }]);
    expect(newState.total).toEqual(3);
  });
});
