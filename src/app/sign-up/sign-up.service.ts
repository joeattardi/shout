import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SignUpService {
  constructor(private httpClient: HttpClient) {}

  checkUsernameTaken(username: string) {
    return this.httpClient.get(`/api/username_check?username=${username}`);
  }

  signup(firstName: string, lastName: string, email: string, username: string, password: string) {
    return this.httpClient.post('/api/signup', {
      firstName,
      lastName,
      email,
      username,
      password
    });
  }
}
