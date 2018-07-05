import { Action } from '@ngrx/store';
import { User } from '../../core/core.types';

export enum UsersActionTypes {
  LOAD_USERS = '[Admin] load users',
  LOAD_USERS_SUCCESS = '[Admin] load users success',
  LOAD_USERS_ERROR = '[Admin] load users error'
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

export type UsersAction = LoadUsers | LoadUsersSuccess | LoadUsersError;
