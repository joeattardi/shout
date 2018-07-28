import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { State, getRoomListState, getRoomsLoadingState } from '../reducers';

import { Room } from '../../core/core.types';
import { SearchRooms } from '../actions';

@Component({
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnDestroy, OnInit {
  private destroy$ = new Subject<void>();

  loading$: Observable<boolean>;

  rooms: Room[];

  constructor(private store: Store<State>) {
    this.loading$ = this.store.select(getRoomsLoadingState);

    this.store
      .select(getRoomListState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(new SearchRooms(''));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
