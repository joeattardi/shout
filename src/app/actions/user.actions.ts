import { Action } from '@ngrx/store';

import { User } from '../modules/core/core.types';

export enum UserActionTypes {
  GET_CURRENT_USER = '[User] Get current user',
  GET_CURRENT_USER_SUCCESS = '[User] Get current user success',
  GET_CURRENT_USER_ERROR = '[User] Get current user error',
  UPDATE_CURRENT_USER = '[User] Update current user'
}

export class GetCurrentUser implements Action {
  readonly type = UserActionTypes.GET_CURRENT_USER;
}

export class GetCurrentUserSuccess implements Action {
  readonly type = UserActionTypes.GET_CURRENT_USER_SUCCESS;
  constructor(public user: User) {}
}

export class GetCurrentUserError implements Action {
  readonly type = UserActionTypes.GET_CURRENT_USER_ERROR;
}

export class UpdateCurrentUser implements Action {
  readonly type = UserActionTypes.UPDATE_CURRENT_USER;
  constructor(public user: User) {}
}

export type UserActions = GetCurrentUser | GetCurrentUserSuccess | GetCurrentUserError | UpdateCurrentUser;
