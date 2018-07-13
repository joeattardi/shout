import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { provideMockActions } from '@ngrx/effects/testing';

import { Observable } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';

import { AuthService } from '../modules/core/auth.service';
import { NotificationService } from '../modules/core/notification/notification.service';

import { CoreEffects } from './core.effects';
import { LogOut } from '../actions';
import { NotificationTheme } from '../modules/core/notification/notification.types';

const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
const mockNotificationService = jasmine.createSpyObj('NotificationService', ['showNotification']);
const mockAuthService = jasmine.createSpyObj('AuthService', ['logOut']);

describe('CoreEffects', () => {
  let effects: CoreEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoreEffects,
        provideMockActions(() => actions$),
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    });

    effects = TestBed.get(CoreEffects);
  });

  it('should log out, navigate to home, and show a notification on LOG_OUT', () => {
    const action = new LogOut();
    actions$ = hot('--a', { a: action });

    effects.logOut$.subscribe(() => {
      expect(mockAuthService.logOut).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
      expect(mockNotificationService.showNotification).toHaveBeenCalledWith({
        theme: NotificationTheme.SUCCESS,
        message: 'You have been logged out.'
      });
    });
  });
});
