import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { faComment } from '@fortawesome/free-solid-svg-icons';

import { SignUpActionTypes, SignUp, SignUpSuccess, SignUpError } from '../actions/sign-up.actions';

import { AuthService } from '../../core/auth.service';
import { NotificationService } from '../../core/notification/notification.service';
import { NotificationTheme } from '../../core/notification/notification.types';
import { UpdateCurrentUser } from '../../../actions';

@Injectable()
export class SignUpEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  @Effect()
  signup$: Observable<Action> = this.actions$.pipe(
    ofType(SignUpActionTypes.SIGN_UP),
    switchMap((action: SignUp) => {
      return this.authService.signup(action.firstName, action.lastName, action.email, action.username, action.password).pipe(
        map((result: any) => new SignUpSuccess(result.user)),
        catchError(error => of(new SignUpError()))
      );
    })
  );

  @Effect()
  signupSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(SignUpActionTypes.SIGN_UP_SUCCESS),
    tap((action: SignUpSuccess) => {
      this.router.navigate(['/chat']);
      this.notificationService.showNotification({
        theme: NotificationTheme.SUCCESS,
        message: `Welcome to shout, ${action.user.firstName}!`,
        icon: faComment
      });
    }),
    map((action: SignUpSuccess) => new UpdateCurrentUser(action.user))
  );
}
