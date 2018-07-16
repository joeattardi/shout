import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, tap, catchError, withLatestFrom } from 'rxjs/operators';

import { State } from '../../../reducers';

import { AdminService } from '../admin.service';
import { NotificationService } from '../../core/notification/notification.service';
import { NotificationTheme } from '../../core/notification/notification.types';

import {
  UsersActionTypes,
  DeleteUserConfirm,
  DeleteUserSuccess,
  DeleteUserError,
  LoadUser,
  LoadUserSuccess,
  LoadUserError,
  SaveUser,
  SaveUserSuccess,
  SaveUserError,
  SearchUsers,
  SearchUsersSuccess,
  SearchUsersError
} from '../actions';
import { getUsersSearchState } from '../reducers';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private notificationService: NotificationService,
    private router: Router,
    private store: Store<State>
  ) {}

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
    withLatestFrom(this.store.select(getUsersSearchState)),
    tap(([action]: [DeleteUserSuccess, string]) => {
      this.router.navigate(['/admin', 'users']);
      this.notificationService.showNotification({
        theme: NotificationTheme.SUCCESS,
        message: `The user "${action.user.firstName} ${action.user.lastName}" was deleted.`
      });
    }),
    map(([action, searchTerm]) => new SearchUsers(searchTerm))
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
    withLatestFrom(this.store.select(getUsersSearchState)),
    tap(([action]: [SaveUserSuccess, string]) => {
      this.router.navigate(['/admin', 'users']);
      this.notificationService.showNotification({
        theme: NotificationTheme.SUCCESS,
        message: `The user "${action.user.firstName} ${action.user.lastName}" was saved.`
      });
    }),
    map(([action, searchTerm]) => new SearchUsers(searchTerm))
  );

  @Effect()
  searchUsers$ = this.actions$.pipe(
    ofType(UsersActionTypes.SEARCH_USERS),
    debounceTime(300),
    switchMap((action: SearchUsers) => {
      return this.adminService.searchUsers(action.searchTerm).pipe(
        map((result: any) => new SearchUsersSuccess(result.users)),
        catchError(error => of(new SearchUsersError()))
      );
    })
  );
}
