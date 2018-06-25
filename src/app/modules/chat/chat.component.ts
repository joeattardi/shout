import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { faComment, faUser } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../core/auth.service';
import { User } from '../core/core.types';

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  faComment = faComment;
  faUser = faUser;

  showUserMenu = false;

  constructor(private authService: AuthService, private router: Router, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('shout');
  }

  get user(): User {
    return this.authService.currentUser;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  hideUserMenu(): void {
    if (this.showUserMenu) {
      this.showUserMenu = false;
    }
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
