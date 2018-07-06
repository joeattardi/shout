import { User } from '../../../core/core.types';
import { UsersActionTypes, UsersAction } from '../../actions';

export interface ConfirmDeleteModalState {
  user: User;
  show: boolean;
}

const initialState: ConfirmDeleteModalState = {
  user: null,
  show: false
};

export function deleteModalReducer(state = initialState, action: UsersAction): ConfirmDeleteModalState {
  switch (action.type) {
    case UsersActionTypes.DELETE_USER:
      return {
        user: action.user,
        show: true
      };

    case UsersActionTypes.DELETE_USER_CONFIRM:
    case UsersActionTypes.DELETE_USER_CANCEL:
      return {
        user: null,
        show: false
      };

    default:
      return state;
  }
}
