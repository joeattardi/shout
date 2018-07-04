import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import { UserService } from '../../core/user.service';
import { NotificationService } from '../../core/notification/notification.service';
import { NotificationTheme } from '../../core/notification/notification.types';

import { ProfileActionTypes, SaveProfile, SaveProfileSuccess, SaveProfileAuthError, SaveProfileError } from '../actions';
import { UpdateCurrentUser } from '../../../actions';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  @Effect()
  saveProfile$: Observable<Action> = this.actions$.pipe(
    ofType(ProfileActionTypes.SAVE_PROFILE),
    switchMap((action: SaveProfile) => {
      return this.userService
        .updateProfile(
          action.profile.firstName,
          action.profile.lastName,
          action.profile.email,
          action.profile.currentPassword,
          action.profile.newPassword
        )
        .pipe(
          map(() => new SaveProfileSuccess(action.profile)),
          catchError(error => {
            if (error.status === 403) {
              return of(new SaveProfileAuthError());
            }
            return of(new SaveProfileError());
          })
        );
    })
  );

  @Effect()
  saveProfileSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(ProfileActionTypes.SAVE_PROFILE_SUCCESS),
    tap(() => {
      this.router.navigate(['/chat']);
      this.notificationService.showNotification({
        theme: NotificationTheme.SUCCESS,
        message: 'Your profile was updated successfully.'
      });
    }),
    map(
      (action: SaveProfileSuccess) =>
        new UpdateCurrentUser({
          firstName: action.profile.firstName,
          lastName: action.profile.lastName,
          email: action.profile.email
        })
    )
  );
}
