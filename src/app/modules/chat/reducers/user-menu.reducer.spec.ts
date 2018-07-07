import { userMenuReducer } from './user-menu.reducer';
import { ShowUserMenu, HideUserMenu } from '../actions';

describe('User Menu Reducer', () => {
  it('should show the user menu on SHOW_USER_MENU', () => {
    const state = false;
    const newState = userMenuReducer(state, new ShowUserMenu());
    expect(newState).toBe(true);
  });

  it('should hide the user menu on HIDE_USER_MENU', () => {
    const state = true;
    const newState = userMenuReducer(state, new HideUserMenu());
    expect(newState).toBe(false);
  });
});
