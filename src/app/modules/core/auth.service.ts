import { Injectable } from '@angular/core';

import { User } from '../core/core.types';

@Injectable()
export class AuthService {
  currentUser: User = null;

  get isLoggedIn() {
    return this.currentUser !== null;
  }

  logOut() {
    this.currentUser = null;
  }
}
