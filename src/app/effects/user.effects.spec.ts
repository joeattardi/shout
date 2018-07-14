import { TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';

import { AuthService } from '../modules/core/auth.service';
import { UserEffects } from './user.effects';
import { GetCurrentUser, GetCurrentUserSuccess } from '../actions';

const mockAuthService = jasmine.createSpyObj('AuthService', ['getCurrentUser']);

describe('UserEffects', () => {
  let effects: UserEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEffects, provideMockActions(() => actions$), { provide: AuthService, useValue: mockAuthService }]
    });

    effects = TestBed.get(UserEffects);
  });

  it('should return GET_CURRENT_USER_SUCCESS when getting the current user', () => {
    mockAuthService.getCurrentUser.and.returnValue(
      of({
        user: { username: 'joe' }
      })
    );

    const action = new GetCurrentUser();
    actions$ = hot('--a-', { a: action });

    const completion = new GetCurrentUserSuccess({ username: 'joe' });
    const expected = cold('--b', { b: completion });

    expect(effects.getCurrentUser$).toBeObservable(expected);
  });
});
