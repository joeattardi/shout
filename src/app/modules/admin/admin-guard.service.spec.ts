import { cold } from 'jasmine-marbles';

import { MockStore } from '../../testing/store.mock';
import { AdminGuard } from './admin-guard.service';

describe('AdminGuard', () => {
  const mockStore = new MockStore({
    user: {
      admin: false
    }
  });

  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  const adminGuard = new AdminGuard(<any>mockStore, mockRouter);

  it('should return true if the user is an admin', () => {
    mockStore.next({
      user: {
        admin: true
      }
    });

    expect(adminGuard.canActivate()).toBeObservable(cold('(a|)', { a: true }));
  });

  it('should navigate to the chat page and return false if the user is not an admin', () => {
    mockStore.next({
      user: {
        admin: false
      }
    });

    expect(adminGuard.canActivate()).toBeObservable(cold('(a|)', { a: false }));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/chat']);
  });
});
