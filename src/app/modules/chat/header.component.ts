import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { faComment, faUser } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../core/auth.service';
import { User } from '../core/core.types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  icons = {
    comment: faComment,
    user: faUser
  };

  constructor(private authService: AuthService, private router: Router) {}

  get user(): User {
    return this.authService.currentUser;
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
