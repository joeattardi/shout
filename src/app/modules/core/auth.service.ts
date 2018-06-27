import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';

import * as moment from 'moment';

import { User } from '../core/core.types';

@Injectable()
export class AuthService {
  currentUser: User = null;

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    return this.httpClient
      .post('/api/login', {
        username,
        password
      })
      .pipe(tap(response => this.setSession(response)));
  }

  logOut() {
    this.currentUser = null;

    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  isLoggedIn() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    return !!this.currentUser && moment().isBefore(this.getExpiration());
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('user', JSON.stringify(authResult.user));
  }
}