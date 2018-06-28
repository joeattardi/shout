import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { faChevronDown, faChevronUp, faComment, faUser } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../core/auth.service';
import { User } from '../../core/core.types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  icons = {
    chevronDown: faChevronDown,
    chevronUp: faChevronUp,
    comment: faComment,
    user: faUser
  };

  userMenuIcon = this.icons.chevronDown;

  constructor(private authService: AuthService, private router: Router) {}

  get user(): User {
    return this.authService.currentUser;
  }

  showUpArrow(): void {
    this.userMenuIcon = this.icons.chevronUp;
  }

  showDownArrow(): void {
    this.userMenuIcon = this.icons.chevronDown;
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
