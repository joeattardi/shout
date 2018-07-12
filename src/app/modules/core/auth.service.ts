import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';

import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    return this.httpClient
      .post('/api/login', {
        username,
        password
      })
      .pipe(tap(response => this.setSession(response)));
  }

  signup(firstName: string, lastName: string, email: string, username: string, password: string) {
    return this.httpClient
      .post('/api/signup', {
        firstName,
        lastName,
        email,
        username,
        password
      })
      .pipe(tap(response => this.setSession(response)));
  }

  getCurrentUser() {
    const token = this.getToken();
    return this.httpClient.get('/api/current_user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  checkUsernameTaken(username: string) {
    return this.httpClient.get(`/api/username_check?username=${username}`);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
  }

  isLoggedIn() {
    return !!this.getToken() && moment().isBefore(this.getExpiration());
  }

  getToken() {
    return localStorage.getItem('token');
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
