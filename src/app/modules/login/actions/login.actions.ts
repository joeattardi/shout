import { Action } from '@ngrx/store';

export enum LoginActionTypes {
  LOGIN = '[Login] log in',
  LOGIN_SUCCESS = '[Login] login successful',
  LOGIN_AUTH_ERROR = '[Login] auth error',
  LOGIN_ERROR = '[Login] login error'
}

export class Login implements Action {
  readonly type = LoginActionTypes.LOGIN;
  constructor(public username: string, public password: string) {}
}

export class LoginSuccess implements Action {
  readonly type = LoginActionTypes.LOGIN_SUCCESS;
}

export class LoginAuthError implements Action {
  readonly type = LoginActionTypes.LOGIN_AUTH_ERROR;
}

export class LoginError implements Action {
  readonly type = LoginActionTypes.LOGIN_ERROR;
}

export type LoginAction = Login | LoginSuccess | LoginAuthError | LoginError;
