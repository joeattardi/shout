import { deleteModalReducer } from './delete-modal.reducer';
import { DeleteUser, DeleteUserConfirm, DeleteUserCancel } from '../../actions';

describe('Admin User Delete Confirm Modal Reducer', () => {
  const user = {
    firstName: 'Foo',
    lastName: 'Bar',
    username: 'foobar'
  };

  it('should show the modal and set the user on DELETE_USER', () => {
    const state = {
      user: null,
      show: false
    };
    const newState = deleteModalReducer(state, new DeleteUser(user));
    expect(newState).toEqual({
      user,
      show: true
    });
  });

  it('should hide the modal and clear the user on DELETE_USER_CONFIRM', () => {
    const state = {
      user,
      show: true
    };
    const newState = deleteModalReducer(state, new DeleteUserConfirm(user));
    expect(newState).toEqual({
      user: null,
      show: false
    });
  });

  it('should hide the modal and clear the user on DELETE_USER_CANCEL', () => {
    const state = {
      user,
      show: true
    };
    const newState = deleteModalReducer(state, new DeleteUserCancel());
    expect(newState).toEqual({
      user: null,
      show: false
    });
  });
});
