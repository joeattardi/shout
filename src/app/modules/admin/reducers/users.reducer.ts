import { User } from '../../core/core.types';
import { UsersActionTypes, UsersAction } from '../actions';

export interface ConfirmDeleteModalState {
  user: User;
  show: boolean;
}

export interface EditUserState {
  user: User;
  loading: boolean;
  error: boolean;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: boolean;
  edit: EditUserState;
  confirmDeleteModal: ConfirmDeleteModalState;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: false,
  edit: {
    user: null,
    loading: false,
    error: false
  },
  confirmDeleteModal: {
    user: null,
    show: false
  }
};

export function usersReducer(state = initialState, action: UsersAction): UsersState {
  switch (action.type) {
    case UsersActionTypes.LOAD_USERS:
      return {
        ...state,
        users: [],
        error: false,
        loading: true
      };
    case UsersActionTypes.LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        loading: false,
        error: false
      };
    case UsersActionTypes.LOAD_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case UsersActionTypes.DELETE_USER:
      return {
        ...state,
        confirmDeleteModal: {
          user: action.user,
          show: true
        }
      };
    case UsersActionTypes.DELETE_USER_CONFIRM:
      return {
        ...state,
        confirmDeleteModal: {
          user: null,
          show: false
        }
      };
    case UsersActionTypes.DELETE_USER_CANCEL:
      return {
        ...state,
        confirmDeleteModal: {
          user: null,
          show: false
        }
      };
    case UsersActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(user => user !== action.user)
      };
    case UsersActionTypes.LOAD_USER:
      return {
        ...state,
        edit: {
          user: null,
          loading: true,
          error: false
        }
      };
    case UsersActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        edit: {
          user: action.user,
          loading: false,
          error: false
        }
      };
    case UsersActionTypes.LOAD_USER_ERROR:
      return {
        ...state,
        edit: {
          user: null,
          loading: false,
          error: true
        }
      };
    case UsersActionTypes.SAVE_USER:
      return {
        ...state,
        edit: {
          ...state.edit,
          loading: true,
          error: false
        }
      };
    case UsersActionTypes.SAVE_USER_SUCCESS:
      return {
        ...state,
        edit: {
          user: null,
          loading: false,
          error: false
        }
      };
    case UsersActionTypes.SAVE_USER_ERROR:
      return {
        ...state,
        edit: {
          ...state.edit,
          loading: false,
          error: true
        }
      };
    default:
      return state;
  }
}

export function getUserList(state: UsersState) {
  return state.users;
}

export function getUsersLoading(state: UsersState) {
  return state.loading;
}

export function getUsersError(state: UsersState) {
  return state.error;
}

export function getConfirmDeleteModal(state: UsersState) {
  return state.confirmDeleteModal;
}

export function getUserEdit(state: UsersState) {
  return state.edit;
}
