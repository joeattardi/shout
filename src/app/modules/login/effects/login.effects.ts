import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { faComment } from '@fortawesome/free-solid-svg-icons';

import { LoginActionTypes, Login, LoginSuccess, LoginError, LoginAuthError } from '../actions/login.actions';

import { AuthService } from '../../core/auth.service';
import { NotificationService } from '../../core/notification/notification.service';
import { NotificationTheme } from '../../core/notification/notification.types';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(LoginActionTypes.LOGIN),
    switchMap((action: Login) => {
      return this.authService.login(action.username, action.password).pipe(
        map(() => new LoginSuccess()),
        catchError(error => {
          if (error.status === 403) {
            return of(new LoginAuthError());
          }
          return of(new LoginError());
        })
      );
    })
  );

  @Effect({ dispatch: false })
  loginSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(LoginActionTypes.LOGIN_SUCCESS),
    tap(() => this.router.navigate(['/chat'])),
    tap(() =>
      this.notificationService.showNotification({
        theme: NotificationTheme.SUCCESS,
        message: 'Welcome back!',
        icon: faComment
      })
    )
  );
}
