import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { State, getRoomListState, getRoomsLoadingState, getRoomsErrorState, getRoomsSearchState } from '../reducers';

import { Room } from '../../core/core.types';
import { SearchRooms } from '../actions';

@Component({
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnDestroy, OnInit {
  private destroy$ = new Subject<void>();

  error$: Observable<boolean>;
  loading$: Observable<boolean>;

  rooms: Room[];
  searchTerm: string;

  constructor(private store: Store<State>) {
    this.error$ = this.store.select(getRoomsErrorState);
    this.loading$ = this.store.select(getRoomsLoadingState);

    this.store
      .select(getRoomListState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      });

    this.store
      .select(getRoomsSearchState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchTerm: string) => {
        this.searchTerm = searchTerm;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(new SearchRooms(''));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  searchRooms(searchTerm: string): void {
    this.store.dispatch(new SearchRooms(searchTerm));
  }

  retryLoadRooms(): void {
    this.store.dispatch(new SearchRooms(this.searchTerm));
  }
}
