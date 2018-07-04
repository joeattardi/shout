import { Component, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { faChevronDown, faComment, faUser } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../core/core.types';

import { State } from '../../../reducers';
import { getUserState } from '../../../reducers/user.reducer';
import { getUserMenuState } from '../reducers';
import { ShowUserMenu, HideUserMenu } from '../actions';
import { LogOut } from '../../../actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  icons = {
    chevronDown: faChevronDown,
    comment: faComment,
    user: faUser
  };

  user$: Observable<User>;

  userMenuOpen$: Observable<boolean>;

  @ViewChild('userMenu') userMenu;

  constructor(private store: Store<State>) {
    this.user$ = this.store.select(getUserState);
    this.userMenuOpen$ = this.store.select(getUserMenuState);
  }

  showUserMenu(): void {
    this.store.dispatch(new ShowUserMenu());
  }

  hideUserMenu(): void {
    this.store.dispatch(new HideUserMenu());
    this.userMenu.hide();
  }

  logOut(): void {
    this.hideUserMenu();
    this.store.dispatch(new LogOut());
  }
}
