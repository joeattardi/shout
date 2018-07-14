import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';

import { faComment } from '@fortawesome/free-solid-svg-icons';

import { LoginEffects } from './login.effects';

import { AuthService } from '../../core/auth.service';
import { NotificationService } from '../../core/notification/notification.service';
import { NotificationTheme } from '../../core/notification/notification.types';

import { Login, LoginSuccess, LoginError, LoginAuthError } from '../actions/login.actions';
import { UpdateCurrentUser } from '../../../actions';

const mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
const mockNotificationService = jasmine.createSpyObj('NotificationService', ['showNotification']);
const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('LoginEffects', () => {
  let effects: LoginEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginEffects,
        provideMockActions(() => actions$),
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    });

    effects = TestBed.get(LoginEffects);
  });

  it('should return LOGIN_SUCCESS on successful login', () => {
    mockAuthService.login.and.returnValue(
      of({
        user: { username: 'joe' }
      })
    );

    const action = new Login('joe', 'foo');
    actions$ = hot('--a-', { a: action });

    const completion = new LoginSuccess({ username: 'joe' });
    const expected = cold('--b', { b: completion });

    expect(effects.login$).toBeObservable(expected);
  });

  it('should return LOGIN_AUTH_ERROR when the login is incorrect', () => {
    mockAuthService.login.and.returnValue(throwError({ status: 403 }));

    const action = new Login('joe', 'foo');
    actions$ = hot('--a-', { a: action });

    const completion = new LoginAuthError();
    const expected = cold('--b', { b: completion });

    expect(effects.login$).toBeObservable(expected);
  });

  it('should return LOGIN_ERROR on login error', () => {
    mockAuthService.login.and.returnValue(throwError({ status: 500 }));

    const action = new Login('joe', 'foo');
    actions$ = hot('--a-', { a: action });

    const completion = new LoginError();
    const expected = cold('--b', { b: completion });

    expect(effects.login$).toBeObservable(expected);
  });

  it('should navigate to /chat, show a notification, and return UPDATE_CURRENT_USER on login success', () => {
    const action = new LoginSuccess({ firstName: 'Joe' });
    actions$ = hot('--a-', { a: action });

    const completion = new UpdateCurrentUser({ firstName: 'Joe' });
    const expected = cold('--b', { b: completion });

    expect(effects.loginSuccess$).toBeObservable(expected);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/chat']);
    expect(mockNotificationService.showNotification).toHaveBeenCalledWith({
      theme: NotificationTheme.SUCCESS,
      message: 'Welcome back, Joe!',
      icon: faComment
    });
  });
});
