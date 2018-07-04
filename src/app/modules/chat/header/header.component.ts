import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { faChevronDown, faComment, faUser } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../core/auth.service';
import { NotificationService } from '../../core/notification/notification.service';
import { NotificationTheme } from '../../core/notification/notification.types';
import { User } from '../../core/core.types';

import { State } from '../../../reducers';
import { getUserState } from '../../../reducers/user.reducer';
import { getUserMenuState } from '../reducers/user-menu.reducer';
import { ShowUserMenu, HideUserMenu } from '../actions';

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

  @ViewChild('userMenu') UserMenu;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private store: Store<State>
  ) {
    this.user$ = this.store.select(getUserState);
    this.userMenuOpen$ = this.store.select(getUserMenuState);
  }

  showUserMenu(): void {
    this.store.dispatch(new ShowUserMenu());
  }

  hideUserMenu(): void {
    this.store.dispatch(new HideUserMenu());
    this.UserMenu.hide();
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/home']);
    this.notificationService.showNotification({
      theme: NotificationTheme.SUCCESS,
      message: 'You have been logged out.'
    });
  }
}
