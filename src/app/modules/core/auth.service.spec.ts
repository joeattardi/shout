import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

  let authService: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    authService = new AuthService(httpClient);
  });

  it('should post the username and password to /api/login', () => {
    authService.login('foo', 'bar').subscribe(result => {
      authService.logOut();
    });

    const req = httpTestingController.expectOne('/api/login');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      username: 'foo',
      password: 'bar'
    });

    req.flush({
      result: 'logged_in',
      token: 'abc123',
      expiresIn: 3600,
      user: {
        username: 'foo'
      }
    });
  });

  it(
    'should store the token, expiration time, and user after login',
    fakeAsync(() => {
      const requestTime = Date.now();
      authService.login('foo', 'bar').subscribe(() => {
        expect(localStorage.getItem('token')).toEqual('abc123');
        expect(JSON.parse(localStorage.getItem('expires_at'))).toEqual(requestTime + 3600000);
        expect(JSON.parse(localStorage.getItem('user'))).toEqual({ username: 'foo' });

        authService.logOut();
      });

      const req = httpTestingController.expectOne('/api/login');
      req.flush({
        result: 'logged_in',
        token: 'abc123',
        expiresIn: 3600,
        user: {
          username: 'foo'
        }
      });
    })
  );

  it('should determine if the user is logged in', () => {
    expect(authService.isLoggedIn()).toBe(false);

    authService.login('foo', 'bar').subscribe(() => {
      expect(authService.isLoggedIn()).toBe(true);
    });

    const req = httpTestingController.expectOne('/api/login');
    req.flush({
      result: 'logged_in',
      token: 'abc123',
      expiresIn: 3600,
      user: {
        username: 'foo'
      }
    });
  });

  it('should log the user out by clearing the token, expiration time, and user', () => {
    authService.login('foo', 'bar').subscribe(() => {
      authService.logOut();
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });

    const req = httpTestingController.expectOne('/api/login');
    req.flush({
      result: 'logged_in',
      token: 'abc123',
      expiresIn: 3600,
      user: {
        username: 'foo'
      }
    });
  });

  it(
    'should sign up the user and store the token, expiration time, and user',
    fakeAsync(() => {
      const requestTime = Date.now();
      authService.signup('Joe', 'Foo', 'joe@foo.com', 'joe', 'foo').subscribe(() => {
        expect(localStorage.getItem('token')).toEqual('abc123');
        expect(JSON.parse(localStorage.getItem('expires_at'))).toEqual(requestTime + 3600000);
        expect(JSON.parse(localStorage.getItem('user'))).toEqual({ username: 'foo' });
        authService.logOut();
      });

      const req = httpTestingController.expectOne('/api/signup');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({
        firstName: 'Joe',
        lastName: 'Foo',
        username: 'joe',
        email: 'joe@foo.com',
        password: 'foo'
      });

      req.flush({
        result: 'success',
        token: 'abc123',
        expiresIn: 3600,
        user: {
          username: 'foo'
        }
      });
    })
  );

  it('should request the current user with the token', () => {
    localStorage.setItem('token', 'abc123');
    authService.getCurrentUser().subscribe(() => {});

    const req = httpTestingController.expectOne('/api/current_user');
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc123');
  });

  it('should check if a username is taken', () => {
    authService.checkUsernameTaken('joe').subscribe(() => {});

    const req = httpTestingController.expectOne('/api/username_check?username=joe');
    expect(req.request.method).toEqual('GET');
  });
});
