import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { User } from '../../core/core.types';

import { State } from '../../../reducers';
import { LoadUsers, DeleteUser, DeleteUserCancel, DeleteUserConfirm } from '../actions';
import { getUserListState, getUsersLoadingState, getUsersErrorState, getUsersDeleteModalState } from '../reducers';
import { ConfirmDeleteModalState } from '../reducers/users.reducer';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  deleteModal$: Observable<ConfirmDeleteModalState>;

  constructor(private store: Store<State>) {
    this.users$ = this.store.select(getUserListState);
    this.loading$ = this.store.select(getUsersLoadingState);
    this.error$ = this.store.select(getUsersErrorState);
    this.deleteModal$ = this.store.select(getUsersDeleteModalState);
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadUsers());
  }

  retryLoadUsers(): void {
    this.store.dispatch(new LoadUsers());
  }

  deleteUser(user: User): void {
    this.store.dispatch(new DeleteUser(user));
  }

  confirmDelete(user: User): void {
    this.store.dispatch(new DeleteUserConfirm());
  }

  cancelDelete(): void {
    this.store.dispatch(new DeleteUserCancel());
  }
}
