import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { delay, map, switchMap, tap, catchError } from 'rxjs/operators';

import { AdminService } from '../admin.service';
import { NotificationService } from '../../core/notification/notification.service';
import { NotificationTheme } from '../../core/notification/notification.types';

import {
  UsersActionTypes,
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
  SaveUserError,
  LoadUsers
} from '../actions';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  @Effect()
  getUsers$: Observable<Action> = this.actions$.pipe(
    ofType(UsersActionTypes.LOAD_USERS),
    switchMap(() => {
      return this.adminService.getUsers().pipe(
        map((result: any) => new LoadUsersSuccess(result.users)),
        catchError(error => of(new LoadUsersError()))
      );
    })
  );

  @Effect()
  deleteUser$: Observable<Action> = this.actions$.pipe(
    ofType(UsersActionTypes.DELETE_USER_CONFIRM),
    switchMap((action: DeleteUserConfirm) => {
      return this.adminService.deleteUser(action.user).pipe(
        map((result: any) => new DeleteUserSuccess(action.user)),
        catchError(error => of(new DeleteUserError()))
      );
    })
  );

  @Effect()
  deleteUserSuccess$ = this.actions$.pipe(
    ofType(UsersActionTypes.DELETE_USER_SUCCESS),
    tap((action: DeleteUserSuccess) => {
      this.router.navigate(['/admin', 'users']);
      this.notificationService.showNotification({
        theme: NotificationTheme.SUCCESS,
        message: `The user "${action.user.firstName} ${action.user.lastName}" was deleted.`
      });
    }),
    map(() => new LoadUsers())
  );

  @Effect()
  editUser$: Observable<Action> = this.actions$.pipe(
    ofType(UsersActionTypes.LOAD_USER),
    switchMap((action: LoadUser) => {
      return this.adminService.getUser(action.userId).pipe(
        map((result: any) => new LoadUserSuccess(result.user)),
        catchError(error => of(new LoadUserError()))
      );
    })
  );

  @Effect()
  saveUser$: Observable<Action> = this.actions$.pipe(
    ofType(UsersActionTypes.SAVE_USER),
    switchMap((action: SaveUser) => {
      return this.adminService.saveUser(action.userId, action.user).pipe(
        map((result: any) => new SaveUserSuccess(action.user)),
        catchError(error => of(new SaveUserError()))
      );
    })
  );

  @Effect()
  saveUserSuccess$ = this.actions$.pipe(
    ofType(UsersActionTypes.SAVE_USER_SUCCESS),
    tap((action: SaveUserSuccess) => {
      this.router.navigate(['/admin', 'users']);
      this.notificationService.showNotification({
        theme: NotificationTheme.SUCCESS,
        message: `The user "${action.user.firstName} ${action.user.lastName}" was saved.`
      });
    }),
    map(() => new LoadUsers())
  );
}
