import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from '../core/auth.service';
import { User } from '../core/core.types';

@Injectable()
export class AdminService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getUsers() {
    return this.httpClient.get('/api/admin/users', {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  deleteUser(user: User) {
    return this.httpClient.delete(`/api/admin/users/${user.id}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  getUser(userId: number) {
    return this.httpClient.get(`/api/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  saveUser(userId: number, user: User) {
    return this.httpClient.put(
      `/api/admin/users/${userId}`,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        admin: user.admin,
        password: user.password
      },
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      }
    );
  }

  checkUsernameTaken(username: string, userId: number) {
    return this.httpClient.get(`/api/admin/username_check?username=${username}&userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }
}
