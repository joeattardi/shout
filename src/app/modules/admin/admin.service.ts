import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from '../core/auth.service';

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
}