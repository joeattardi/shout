import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class SignUpService {
  constructor(private httpClient: HttpClient) {}

  signup(firstName: string, lastName: string, username: string, password: string): Observable<any> {
    return this.httpClient.post('/api/signup', {
      firstName,
      lastName,
      username,
      password
    });
  }
}
