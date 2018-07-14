import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';

import { faComment } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../core/auth.service';
import { NotificationService } from '../../core/notification/notification.service';
import { NotificationTheme } from '../../core/notification/notification.types';
import { SignUpEffects } from './sign-up.effects';
import { SignUp, SignUpSuccess, SignUpError } from '../actions/sign-up.actions';
import { UpdateCurrentUser } from '../../../actions';

const mockAuthService = jasmine.createSpyObj('AuthService', ['signup']);
const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
const mockNotificationService = jasmine.createSpyObj('NotificationService', ['showNotification']);

describe('SignUpEffects', () => {
  let effects: SignUpEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SignUpEffects,
        provideMockActions(() => actions$),
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    });

    effects = TestBed.get(SignUpEffects);
  });

  describe('signup$', () => {
    it('should return SIGN_UP_SUCCESS on signup', () => {
      mockAuthService.signup.and.returnValue(
        of({
          user: {
            username: 'joe'
          }
        })
      );

      const action = new SignUp('Joe', 'Foo', 'joe@foo.com', 'joe', 'foo');
      actions$ = hot('--a', { a: action });

      const completion = new SignUpSuccess({ username: 'joe' });
      const expected = cold('--b', { b: completion });

      expect(effects.signup$).toBeObservable(expected);
    });

    it('should return SIGN_UP_ERROR on signup error', () => {
      mockAuthService.signup.and.returnValue(throwError({ status: 500 }));

      const action = new SignUp('Joe', 'Foo', 'joe@foo.com', 'joe', 'foo');
      actions$ = hot('--a', { a: action });

      const completion = new SignUpError();
      const expected = cold('--b', { b: completion });

      expect(effects.signup$).toBeObservable(expected);
    });
  });

  describe('signupSuccess$', () => {
    it('should navigate to /chat, show a notification, and return UPDATE_CURRENT_USER on successful signup', () => {
      const action = new SignUpSuccess({ firstName: 'Joe' });
      actions$ = hot('--a', { a: action });

      const completion = new UpdateCurrentUser({ firstName: 'Joe' });
      const expected = cold('--b', { b: completion });

      expect(effects.signupSuccess$).toBeObservable(expected);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/chat']);
      expect(mockNotificationService.showNotification).toHaveBeenCalledWith({
        theme: NotificationTheme.SUCCESS,
        message: 'Welcome to shout, Joe!',
        icon: faComment
      });
    });
  });
});
