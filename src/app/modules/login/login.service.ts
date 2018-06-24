import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(username, password) {
    return this.httpClient.post('/api/login', {
      username,
      password
    });
  }
}
