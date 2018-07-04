import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take, catchError, switchMap } from 'rxjs/operators';

import { State } from '../../reducers';
import { getUserState } from '../../reducers/user.reducer';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private store: Store<State>, private router: Router) {}

  getFromStore(): Observable<any> {
    return this.store.select(getUserState).pipe(take(1));
  }

  canActivate(): Observable<boolean> {
    return this.getFromStore().pipe(
      switchMap(user => {
        if (!user.admin) {
          this.router.navigate(['/chat']);
        }
        return of(user.admin);
      }),
      catchError(() => {
        this.router.navigate(['/chat']);
        return of(false);
      })
    );
  }
}
