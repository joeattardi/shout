import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { AuthService } from './auth.service';

describe('UserService', () => {
  let userService: UserService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    const authService = new AuthService(httpClient);
    userService = new UserService(httpClient, authService);

    localStorage.setItem('token', 'abc123');
  });

  it('should PUT to /api/profile when updating the profile', () => {
    userService.updateProfile('Joe', 'Foo', 'joe@foo.com', 'foobar', 'foobaz').subscribe(() => {});

    const req = httpTestingController.expectOne('/api/profile');
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc123');
  });
});
