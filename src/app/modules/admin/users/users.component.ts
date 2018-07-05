import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { User } from '../../core/core.types';

import { State } from '../../../reducers';
import { LoadUsers } from '../actions';
import { getUserListState, getUsersLoadingState } from '../reducers';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.users$ = this.store.select(getUserListState);
    this.loading$ = this.store.select(getUsersLoadingState);
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadUsers());
  }
}
