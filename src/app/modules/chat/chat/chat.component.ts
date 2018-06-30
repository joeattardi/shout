import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';
import { User } from '../../core/core.types';

enum State {
  LOADING,
  EDITING_PROFILE,
  NORMAL
}

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  constructor(private authService: AuthService, private title: Title, private router: Router) {}

  state = State.NORMAL;

  ngOnInit(): void {
    this.title.setTitle('shout');

    this.state = State.LOADING;
    this.authService.getCurrentUser().subscribe(
      () => {
        this.state = State.NORMAL;
      },
      errorResponse => {
        this.authService.logOut();
        this.router.navigate(['/home']);
      }
    );
  }

  get user(): User {
    return this.authService.currentUser;
  }

  get isLoadingState(): boolean {
    return this.state === State.LOADING;
  }

  get isNormalState(): boolean {
    return this.state === State.NORMAL;
  }

  get isEditingProfileState(): boolean {
    return this.state === State.EDITING_PROFILE;
  }
}
