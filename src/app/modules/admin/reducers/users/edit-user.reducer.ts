import { User } from '../../../core/core.types';
import { UsersAction, UsersActionTypes } from '../../actions';

export interface EditUserState {
  user: User;
  loading: boolean;
  error: boolean;
}

const initialState: EditUserState = {
  user: null,
  loading: false,
  error: false
};

export function editUserReducer(state = initialState, action: UsersAction): EditUserState {
  switch (action.type) {
    case UsersActionTypes.LOAD_USER:
      return {
        user: null,
        loading: true,
        error: false
      };

    case UsersActionTypes.LOAD_USER_SUCCESS:
      return {
        user: action.user,
        loading: false,
        error: false
      };

    case UsersActionTypes.LOAD_USER_ERROR:
      return {
        user: null,
        loading: false,
        error: true
      };

    case UsersActionTypes.SAVE_USER:
      return {
        ...state,
        loading: true,
        error: false
      };

    case UsersActionTypes.SAVE_USER_SUCCESS:
      return {
        user: null,
        loading: false,
        error: false
      };

    case UsersActionTypes.SAVE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    case UsersActionTypes.CREATE_USER:
      return {
        user: {},
        loading: false,
        error: false
      };

    default:
      return state;
  }
}
