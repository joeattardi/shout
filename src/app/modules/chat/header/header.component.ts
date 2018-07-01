import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { faChevronDown, faChevronUp, faComment, faUser } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../core/auth.service';
import { NotificationService } from '../../core/notification/notification.service';
import { NotificationTheme } from '../../core/notification/notification.types';
import { User } from '../../core/core.types';

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

  userMenuOpen = false;

  @ViewChild('userMenu') popupMenu;

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) {}

  get user(): User {
    return this.authService.currentUser;
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/home']);
    this.notificationService.showNotification({
      theme: NotificationTheme.SUCCESS,
      message: 'You have been logged out.'
    });
  }

  hidePopupMenu(): void {
    this.popupMenu.hide();
  }
}
