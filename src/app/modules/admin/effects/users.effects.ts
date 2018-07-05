import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

import { AdminService } from '../admin.service';
import { NotificationService } from '../../core/notification/notification.service';
import { NotificationTheme } from '../../core/notification/notification.types';

import { UsersActionTypes, LoadUsersSuccess, LoadUsersError, DeleteUserConfirm, DeleteUserSuccess, DeleteUserError } from '../actions';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private adminService: AdminService, private notificationService: NotificationService) {}

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

  @Effect({ dispatch: false })
  deleteUserSucces$ = this.actions$.pipe(
    ofType(UsersActionTypes.DELETE_USER_SUCCESS),
    tap((action: DeleteUserSuccess) => {
      this.notificationService.showNotification({
        theme: NotificationTheme.SUCCESS,
        message: `The user "${action.user.firstName} ${action.user.lastName}" was deleted.`
      });
    })
  );
}
