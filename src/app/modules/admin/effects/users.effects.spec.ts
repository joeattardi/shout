import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';

import { AdminService } from '../admin.service';
import { NotificationService } from '../../core/notification/notification.service';
import { NotificationTheme } from '../../core/notification/notification.types';

import { UsersEffects } from './users.effects';
import {
  LoadUsers,
  LoadUsersSuccess,
  LoadUsersError,
  DeleteUserConfirm,
  DeleteUserSuccess,
  DeleteUserError,
  LoadUser,
  LoadUserSuccess,
  LoadUserError,
  SaveUser,
  SaveUserSuccess,
  SaveUserError
} from '../actions';

const mockAdminService = jasmine.createSpyObj('AdminService', ['getUsers', 'deleteUser', 'getUser', 'saveUser']);
const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
const mockNotificationService = jasmine.createSpyObj('NotificationService', ['showNotification']);

describe('UsersEffects', () => {
  let effects: UsersEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersEffects,
        provideMockActions(() => actions$),
        { provide: AdminService, useValue: mockAdminService },
        { provide: Router, useValue: mockRouter },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    });

    effects = TestBed.get(UsersEffects);
  });

  describe('getUsers$', () => {
    it('should load the users and return LOAD_USERS_SUCCESS on LOAD_USERS', () => {
      const users = [
        {
          username: 'joe'
        },
        {
          username: 'bob'
        }
      ];

      mockAdminService.getUsers.and.returnValue(
        of({
          users
        })
      );

      const action = new LoadUsers();
      actions$ = hot('--a', { a: action });

      const completion = new LoadUsersSuccess(users);
      const expected = cold('--b', { b: completion });

      expect(effects.getUsers$).toBeObservable(expected);
    });

    it('should return LOAD_USERS_ERROR if an error occurs', () => {
      mockAdminService.getUsers.and.returnValue(throwError({ status: 500 }));

      const action = new LoadUsers();
      actions$ = hot('--a', { a: action });

      const completion = new LoadUsersError();
      const expected = cold('--b', { b: completion });

      expect(effects.getUsers$).toBeObservable(expected);
    });
  });

  describe('deleteUser$', () => {
    it('should return DELETE_USER_SUCCESS on success', () => {
      mockAdminService.deleteUser.and.returnValue(of({ result: 'success' }));

      const action = new DeleteUserConfirm({ username: 'joe' });
      actions$ = hot('--a', { a: action });

      const completion = new DeleteUserSuccess({ username: 'joe' });
      const expected = cold('--b', { b: completion });

      expect(effects.deleteUser$).toBeObservable(expected);
    });

    it('should return DELETE_USER_ERROR on error', () => {
      mockAdminService.deleteUser.and.returnValue(throwError({ status: 500 }));

      const action = new DeleteUserConfirm({ username: 'joe' });
      actions$ = hot('--a', { a: action });

      const completion = new DeleteUserError();
      const expected = cold('--b', { b: completion });

      expect(effects.deleteUser$).toBeObservable(expected);
    });
  });

  describe('deleteUserSuccess$', () => {
    it('should navigate to /admin/users, show a notification, and return LOAD_USERS on success', () => {
      const action = new DeleteUserSuccess({ firstName: 'Joe', lastName: 'Foo' });
      actions$ = hot('--a', { a: action });

      const completion = new LoadUsers();
      const expected = cold('--b', { b: completion });

      expect(effects.deleteUserSuccess$).toBeObservable(expected);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin', 'users']);
      expect(mockNotificationService.showNotification).toHaveBeenCalledWith({
        theme: NotificationTheme.SUCCESS,
        message: 'The user "Joe Foo" was deleted.'
      });
    });
  });

  describe('editUser$', () => {
    it('should return LOAD_USER_SUCCESS on success', () => {
      mockAdminService.getUser.and.returnValue(
        of({
          user: {
            username: 'joe'
          }
        })
      );

      const action = new LoadUser(1);
      actions$ = hot('--a', { a: action });

      const completion = new LoadUserSuccess({ username: 'joe' });
      const expected = cold('--b', { b: completion });

      expect(effects.editUser$).toBeObservable(expected);
    });

    it('should return LOAD_USER_ERROR on error', () => {
      mockAdminService.getUser.and.returnValue(throwError({ status: 500 }));

      const action = new LoadUser(1);
      actions$ = hot('--a', { a: action });

      const completion = new LoadUserError();
      const expected = cold('--b', { b: completion });

      expect(effects.editUser$).toBeObservable(expected);
    });
  });

  describe('saveUser$', () => {
    it('should return SAVE_USER_SUCCESS on success', () => {
      mockAdminService.saveUser.and.returnValue(
        of({
          user: {
            username: 'joe'
          }
        })
      );

      const action = new SaveUser(1, { username: 'joe' });
      actions$ = hot('--a', { a: action });

      const completion = new SaveUserSuccess({ username: 'joe' });
      const expected = cold('--b', { b: completion });

      expect(effects.saveUser$).toBeObservable(expected);
    });

    it('should return SAVE_USER_ERROR on error', () => {
      mockAdminService.saveUser.and.returnValue(throwError({ status: 500 }));

      const action = new SaveUser(1, { username: 'joe' });
      actions$ = hot('--a', { a: action });

      const completion = new SaveUserError();
      const expected = cold('--b', { b: completion });

      expect(effects.saveUser$).toBeObservable(expected);
    });
  });

  describe('saveUserSuccess$', () => {
    it('should navigate to /admin/users, show a notification, and return LOAD_USERS on success', () => {
      const action = new SaveUserSuccess({ firstName: 'Joe', lastName: 'Foo' });
      actions$ = hot('--a', { a: action });

      const completion = new LoadUsers();
      const expected = cold('--b', { b: completion });

      expect(effects.saveUserSuccess$).toBeObservable(expected);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin', 'users']);
      expect(mockNotificationService.showNotification).toHaveBeenCalledWith({
        theme: NotificationTheme.SUCCESS,
        message: 'The user "Joe Foo" was saved.'
      });
    });
  });
});
