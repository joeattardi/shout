import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  updateProfile(firstName, lastName, email, currentPassword, newPassword) {
    return this.httpClient
      .put(
        '/api/profile',
        {
          firstName,
          lastName,
          email,
          currentPassword,
          newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${this.authService.getToken()}`
          }
        }
      )
      .pipe(
        tap(response => {
          this.authService.currentUser.firstName = firstName;
          this.authService.currentUser.lastName = lastName;
          this.authService.currentUser.email = email;
        })
      );
  }
}
