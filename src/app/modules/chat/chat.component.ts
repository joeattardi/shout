import { Component } from '@angular/core';

import { faComment, faUser } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../core/auth.service';
import { User } from '../core/core.types';

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  faComment = faComment;
  faUser = faUser;

  constructor(private authService: AuthService) {}

  get user(): User {
    return this.authService.currentUser;
  }
}
