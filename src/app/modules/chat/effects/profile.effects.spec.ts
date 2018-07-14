import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';

import { NotificationService } from '../../core/notification/notification.service';
import { NotificationTheme } from '../../core/notification/notification.types';
import { UserService } from '../../core/user.service';

import { ProfileEffects } from './profile.effects';
import { SaveProfile, SaveProfileSuccess, SaveProfileAuthError, SaveProfileError } from '../actions';
import { UserProfileUpdate } from '../chat.types';
import { UpdateCurrentUser } from '../../../actions';

const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
const mockNotificationService = jasmine.createSpyObj('NotificationService', ['showNotification']);
const mockUserService = jasmine.createSpyObj('UserService', ['updateProfile']);

const profileUpdate: UserProfileUpdate = {
  firstName: 'Joe',
  lastName: 'Foo',
  email: 'joe@foo.com',
  currentPassword: 'foo',
  newPassword: 'bar'
};

describe('ProfileEffects', () => {
  let effects: ProfileEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileEffects,
        provideMockActions(() => actions$),
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    });

    effects = TestBed.get(ProfileEffects);
  });

  describe('saveProfile$', () => {
    it('should return SAVE_PROFILE_SUCCESS when the profile is saved', () => {
      mockUserService.updateProfile.and.returnValue(of({ result: 'success' }));

      const action = new SaveProfile(profileUpdate);
      actions$ = hot('--a', { a: action });

      const completion = new SaveProfileSuccess(profileUpdate);
      const expected = cold('--b', { b: completion });

      expect(effects.saveProfile$).toBeObservable(expected);
    });

    it('should return SAVE_PROFILE_AUTH_ERROR if there was an auth error', () => {
      mockUserService.updateProfile.and.returnValue(throwError({ status: 403 }));

      const action = new SaveProfile(profileUpdate);
      actions$ = hot('--a', { a: action });

      const completion = new SaveProfileAuthError();
      const expected = cold('--b', { b: completion });

      expect(effects.saveProfile$).toBeObservable(expected);
    });

    it('should return SAVE_PROFILE_ERROR if there was an error', () => {
      mockUserService.updateProfile.and.returnValue(throwError({ status: 500 }));

      const action = new SaveProfile(profileUpdate);
      actions$ = hot('--a', { a: action });

      const completion = new SaveProfileError();
      const expected = cold('--b', { b: completion });

      expect(effects.saveProfile$).toBeObservable(expected);
    });
  });

  describe('saveProfileSuccess$', () => {
    it('should navigate to /chat, show a notification, and return UPDATE_CURRENT_USER on SAVE_PROFILE_SUCCESS', () => {
      const action = new SaveProfileSuccess(profileUpdate);
      actions$ = hot('--a', { a: action });

      const completion = new UpdateCurrentUser({
        firstName: 'Joe',
        lastName: 'Foo',
        email: 'joe@foo.com'
      });
      const expected = cold('--b', { b: completion });

      expect(effects.saveProfileSuccess$).toBeObservable(expected);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/chat']);
      expect(mockNotificationService.showNotification).toHaveBeenCalledWith({
        theme: NotificationTheme.SUCCESS,
        message: 'Your profile was updated successfully.'
      });
    });
  });
});
