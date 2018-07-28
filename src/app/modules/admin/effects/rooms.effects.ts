import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, tap, catchError, withLatestFrom } from 'rxjs/operators';

import { State } from '../reducers';

import { SearchRooms, SearchRoomsSuccess, RoomsActionTypes, SearchRoomsError } from '../actions';
import { AdminService } from '../admin.service';

@Injectable()
export class RoomsEffects {
  constructor(private actions$: Actions, private adminService: AdminService) {}

  @Effect()
  searchRooms$ = this.actions$.pipe(
    ofType(RoomsActionTypes.SEARCH_ROOMS),
    debounceTime(300),
    switchMap((action: SearchRooms) => {
      return this.adminService.searchRooms(action.searchTerm, action.offset).pipe(
        map((result: any) => new SearchRoomsSuccess(result.rooms, result.total)),
        catchError(error => of(new SearchRoomsError()))
      );
    })
  );
}
