import { Action } from '@ngrx/store';
import { User } from '../../core/core.types';

export enum UsersActionTypes {
  DELETE_USER = '[Admin] delete user',
  DELETE_USER_CONFIRM = '[Admin] delete user confirm',
  DELETE_USER_CANCEL = '[Admin] delete user cancel',
  DELETE_USER_SUCCESS = '[Admin] delete user success',
  DELETE_USER_ERROR = '[Admin] delete user error',
  EDIT_USER = '[Admin] edit user',
  LOAD_USER = '[Admin] load user',
  LOAD_USER_SUCCESS = '[Admin] load user success',
  LOAD_USER_ERROR = '[Admin] load user error',
  SAVE_USER = '[Admin] save user',
  SAVE_USER_SUCCESS = '[Admin] save user success',
  SAVE_USER_ERROR = '[Admin] save user error',
  CREATE_USER = '[Admin] create user',
  SEARCH_USERS = '[Admin] search users',
  SEARCH_USERS_SUCCESS = '[Admin] search users success',
  SEARCH_USERS_ERROR = '[Admin] search users error',
  SEARCH_MORE_USERS = '[Admin] search more users',
  SEARCH_MORE_USERS_SUCCESS = '[Admin] search more users success',
  SEARCH_MORE_USERS_ERROR = '[Admin] search more users error'
}

export class DeleteUser implements Action {
  readonly type = UsersActionTypes.DELETE_USER;
  constructor(public user: User) {}
}

export class DeleteUserConfirm implements Action {
  readonly type = UsersActionTypes.DELETE_USER_CONFIRM;
  constructor(public user: User) {}
}

export class DeleteUserCancel implements Action {
  readonly type = UsersActionTypes.DELETE_USER_CANCEL;
}

export class DeleteUserSuccess implements Action {
  readonly type = UsersActionTypes.DELETE_USER_SUCCESS;
  constructor(public user: User) {}
}

export class DeleteUserError implements Action {
  readonly type = UsersActionTypes.DELETE_USER_ERROR;
}

export class EditUser implements Action {
  readonly type = UsersActionTypes.EDIT_USER;
  constructor(public userId: number) {}
}

export class LoadUser implements Action {
  readonly type = UsersActionTypes.LOAD_USER;
  constructor(public userId: number) {}
}

export class LoadUserSuccess implements Action {
  readonly type = UsersActionTypes.LOAD_USER_SUCCESS;
  constructor(public user: User) {}
}

export class LoadUserError implements Action {
  readonly type = UsersActionTypes.LOAD_USER_ERROR;
}

export class SaveUser implements Action {
  readonly type = UsersActionTypes.SAVE_USER;
  constructor(public userId: number, public user: User) {}
}

export class SaveUserSuccess implements Action {
  readonly type = UsersActionTypes.SAVE_USER_SUCCESS;
  constructor(public user: User) {}
}

export class SaveUserError implements Action {
  readonly type = UsersActionTypes.SAVE_USER_ERROR;
}

export class CreateUser implements Action {
  readonly type = UsersActionTypes.CREATE_USER;
}

export class SearchUsers implements Action {
  readonly type = UsersActionTypes.SEARCH_USERS;
  constructor(public searchTerm: string, public offset = 0) {}
}

export class SearchUsersSuccess implements Action {
  readonly type = UsersActionTypes.SEARCH_USERS_SUCCESS;
  constructor(public users: User[], public total: number) {}
}

export class SearchUsersError implements Action {
  readonly type = UsersActionTypes.SEARCH_USERS_ERROR;
}

export class SearchMoreUsers implements Action {
  readonly type = UsersActionTypes.SEARCH_MORE_USERS;
  constructor(public searchTerm: string, public offset = 0) {}
}

export class SearchMoreUsersSuccess implements Action {
  readonly type = UsersActionTypes.SEARCH_MORE_USERS_SUCCESS;
  constructor(public users: User[], public total: number) {}
}

export class SearchMoreUsersError implements Action {
  readonly type = UsersActionTypes.SEARCH_MORE_USERS_ERROR;
}

export type UsersAction =
  | DeleteUser
  | DeleteUserConfirm
  | DeleteUserCancel
  | DeleteUserSuccess
  | DeleteUserError
  | EditUser
  | LoadUser
  | LoadUserSuccess
  | LoadUserError
  | SaveUser
  | SaveUserSuccess
  | SaveUserError
  | CreateUser
  | SearchUsers
  | SearchUsersSuccess
  | SearchUsersError
  | SearchMoreUsers
  | SearchMoreUsersSuccess
  | SearchMoreUsersError;
