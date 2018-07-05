import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { AdminService } from '../admin.service';
import { UsersActionTypes, LoadUsersSuccess, LoadUsersError } from '../actions';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private adminService: AdminService) {}

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
}
