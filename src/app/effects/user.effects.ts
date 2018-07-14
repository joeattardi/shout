import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from '../modules/core/auth.service';

import { UserActionTypes, GetCurrentUserSuccess } from '../actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  @Effect()
  getCurrentUser$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.GET_CURRENT_USER),
    switchMap(() => this.authService.getCurrentUser()),
    map((result: any) => new GetCurrentUserSuccess(result.user))
  );
}
