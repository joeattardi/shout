import { Action } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MockStore<T> extends BehaviorSubject<T> {
  constructor(private initialState: T) {
    super(initialState);
  }

  dispatch(action: Action): void {}

  select<R>(pathOrMapFn: any, ...paths: string[]): Observable<R> {
    return this.pipe(map(state => pathOrMapFn(state)));
  }
}
