import { Action } from '@ngrx/store';
import { User } from '../../core/core.types';

export enum UsersActionTypes {
  LOAD_USERS = '[Admin] load users',
  LOAD_USERS_SUCCESS = '[Admin] load users success',
  LOAD_USERS_ERROR = '[Admin] load users error',
  DELETE_USER = '[Admin] delete user',
  DELETE_USER_CONFIRM = '[Admin] delete user confirm',
  DELETE_USER_CANCEL = '[Admin] delete user cancel'
}

export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LOAD_USERS;
}

export class LoadUsersSuccess implements Action {
  readonly type = UsersActionTypes.LOAD_USERS_SUCCESS;
  constructor(public users: User[]) {}
}

export class LoadUsersError implements Action {
  readonly type = UsersActionTypes.LOAD_USERS_ERROR;
}

export class DeleteUser implements Action {
  readonly type = UsersActionTypes.DELETE_USER;
  constructor(public user: User) {}
}

export class DeleteUserConfirm implements Action {
  readonly type = UsersActionTypes.DELETE_USER_CONFIRM;
}

export class DeleteUserCancel implements Action {
  readonly type = UsersActionTypes.DELETE_USER_CANCEL;
}

export type UsersAction = LoadUsers | LoadUsersSuccess | LoadUsersError | DeleteUser | DeleteUserConfirm | DeleteUserCancel;
