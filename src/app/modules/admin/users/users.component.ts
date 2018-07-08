import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from '../../core/core.types';

import { State } from '../../../reducers';
import { LoadUsers, DeleteUser, DeleteUserCancel, DeleteUserConfirm } from '../actions';
import { getUserListState, getUsersLoadingState, getUsersErrorState, getUsersDeleteModalState } from '../reducers';
import { getUserState } from '../../../reducers/user.reducer';
import { ConfirmDeleteModalState } from '../reducers/users/delete-modal.reducer';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy, OnInit {
  private destroy$ = new Subject<void>();

  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  currentUser$: Observable<User>;
  deleteModalState: ConfirmDeleteModalState;

  constructor(private store: Store<State>) {
    this.users$ = this.store.select(getUserListState);
    this.loading$ = this.store.select(getUsersLoadingState);
    this.error$ = this.store.select(getUsersErrorState);
    this.currentUser$ = this.store.select(getUserState);

    this.store
      .select(getUsersDeleteModalState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((deleteModalState: ConfirmDeleteModalState) => {
        this.deleteModalState = deleteModalState;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadUsers());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  retryLoadUsers(): void {
    this.store.dispatch(new LoadUsers());
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
}
