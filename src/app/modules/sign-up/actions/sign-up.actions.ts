import { Action } from '@ngrx/store';

import { User } from '../../core/core.types';

export enum SignUpActionTypes {
  SIGN_UP = '[Sign Up] submit signup',
  SIGN_UP_SUCCESS = '[Sign Up] signup successful',
  SIGN_UP_ERROR = '[Sign Up] signup error'
}

export class SignUp implements Action {
  readonly type = SignUpActionTypes.SIGN_UP;
  constructor(public firstName: string, public lastName: string, public email: string, public username: string, public password: string) {}
}

export class SignUpSuccess implements Action {
  readonly type = SignUpActionTypes.SIGN_UP_SUCCESS;
  constructor(public user: User) {}
}

export class SignUpError implements Action {
  readonly type = SignUpActionTypes.SIGN_UP_ERROR;
}

export type SignUpAction = SignUp | SignUpSuccess | SignUpError;
