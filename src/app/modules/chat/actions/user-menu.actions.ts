import { Action } from '@ngrx/store';

export enum UserMenuActionTypes {
  SHOW_USER_MENU = '[User Menu] show',
  HIDE_USER_MENU = '[User Menu] hide'
}

export class ShowUserMenu implements Action {
  readonly type = UserMenuActionTypes.SHOW_USER_MENU;
}

export class HideUserMenu implements Action {
  readonly type = UserMenuActionTypes.HIDE_USER_MENU;
}

export type UserMenuAction = ShowUserMenu | HideUserMenu;
