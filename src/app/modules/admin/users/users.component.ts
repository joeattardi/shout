import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from '../../core/core.types';

import { State } from '../../../reducers';
import { DeleteUser, DeleteUserCancel, DeleteUserConfirm, SearchUsers, SearchMoreUsers } from '../actions';
import {
  getUserListState,
  getUsersLoadingState,
  getUsersLoadingMoreState,
  getUsersErrorState,
  getUsersDeleteModalState,
  getUsersSearchState,
  getUserListTotalState
} from '../reducers';
import { getUserState } from '../../../reducers/user.reducer';
import { ConfirmDeleteModalState } from '../reducers/users/delete-modal.reducer';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy, OnInit {
  private destroy$ = new Subject<void>();

  loading$: Observable<boolean>;
  loadingMore$: Observable<boolean>;
  error$: Observable<boolean>;
  total$: Observable<number>;
  currentUser$: Observable<User>;

  users: User[];
  deleteModalState: ConfirmDeleteModalState;
  searchTerm: string;

  constructor(private store: Store<State>) {
    this.loading$ = this.store.select(getUsersLoadingState);
    this.loadingMore$ = this.store.select(getUsersLoadingMoreState);
    this.error$ = this.store.select(getUsersErrorState);
    this.currentUser$ = this.store.select(getUserState);
    this.total$ = this.store.select(getUserListTotalState);

    this.store
      .select(getUsersSearchState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchTerm: string) => {
        this.searchTerm = searchTerm;
      });

    this.store
      .select(getUsersDeleteModalState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((deleteModalState: ConfirmDeleteModalState) => {
        this.deleteModalState = deleteModalState;
      });

    this.store
      .select(getUserListState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(new SearchUsers(''));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  retryLoadUsers(): void {
    this.store.dispatch(new SearchUsers(this.searchTerm));
  }

  deleteUser(user: User): void {
    this.store.dispatch(new DeleteUser(user));
  }

  confirmDelete(user: User): void {
    this.store.dispatch(new DeleteUserConfirm(user));
  }

  cancelDelete(): void {
    this.store.dispatch(new DeleteUserCancel());
  }

  searchUsers(searchTerm: string): void {
    this.store.dispatch(new SearchUsers(searchTerm));
  }

  loadMoreUsers(): void {
    this.store.dispatch(new SearchMoreUsers(this.searchTerm, this.users.length));
  }
}
