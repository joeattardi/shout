import { UserMenuActionTypes } from '../actions';

const initialState = false;

export type UserMenuState = boolean;

export function userMenuReducer(state: UserMenuState = initialState, action): UserMenuState {
  switch (action.type) {
    case UserMenuActionTypes.SHOW_USER_MENU:
      return true;
    case UserMenuActionTypes.HIDE_USER_MENU:
      return false;
    default:
      return state;
  }
}
