import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CoreActionTypes } from '../actions';

import { AuthService } from '../modules/core/auth.service';
import { NotificationService } from '../modules/core/notification/notification.service';
import { NotificationTheme } from '../modules/core/notification/notification.types';

export * from './user.effects';

@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect({ dispatch: false })
  logOut$: Observable<Action> = this.actions$.pipe(
    ofType(CoreActionTypes.LOG_OUT),
    tap(() => {
      this.authService.logOut();
      this.router.navigate(['/home']);
      this.notificationService.showNotification({
        theme: NotificationTheme.SUCCESS,
        message: 'You have been logged out.'
      });
    })
  );
}
