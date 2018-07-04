import { Action } from '@ngrx/store';

export * from './user.actions';

export enum CoreActionTypes {
  LOG_OUT = 'Log out'
}

export class LogOut implements Action {
  readonly type = CoreActionTypes.LOG_OUT;
}

export type CoreAction = LogOut;
