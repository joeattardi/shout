import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../core/auth.service';
import { User } from '../../core/core.types';

enum State {
  LOADING,
  NORMAL
}

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  constructor(private authService: AuthService, private title: Title) {}

  state = State.NORMAL;

  ngOnInit(): void {
    this.title.setTitle('shout');

    this.state = State.LOADING;
    this.authService.getCurrentUser().subscribe(() => {
      this.state = State.NORMAL;
    });
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
}
