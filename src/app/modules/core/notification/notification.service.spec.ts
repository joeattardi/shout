import { fakeAsync, tick } from '@angular/core/testing';
import { MockStore } from '../../../testing/store.mock';

import { NotificationService } from './notification.service';
import { NotificationTheme } from './notification.types';
import { ShowNotification, RemoveNotification } from '../actions';

describe('NotificationService', () => {
  let service: NotificationService;
  let mockStore: MockStore<any>;

  beforeEach(() => {
    mockStore = new MockStore({});
    service = new NotificationService(<any>mockStore);
  });

  it('should dispatch an action when a notification is shown', () => {
    spyOn(mockStore, 'dispatch');
    service.showNotification({
      theme: NotificationTheme.SUCCESS,
      message: 'Success!'
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(new ShowNotification({ theme: NotificationTheme.SUCCESS, message: 'Success!' }));
  });

  it(
    'should dispatch an action to remove the notification 5 seconds after it is shown',
    fakeAsync(() => {
      spyOn(mockStore, 'dispatch');
      service.showNotification({
        theme: NotificationTheme.SUCCESS,
        message: 'Success!'
      });

      tick(5000);

      expect(mockStore.dispatch).toHaveBeenCalledWith(new RemoveNotification({ theme: NotificationTheme.SUCCESS, message: 'Success!' }));
    })
  );

  it(
    'should not dispatch an action to remove a sticky notification',
    fakeAsync(() => {
      spyOn(mockStore, 'dispatch');
      service.showNotification({
        theme: NotificationTheme.SUCCESS,
        message: 'Success!',
        sticky: true
      });

      tick(5000);

      expect(mockStore.dispatch).not.toHaveBeenCalledWith(jasmine.any(RemoveNotification));
    })
  );
});
