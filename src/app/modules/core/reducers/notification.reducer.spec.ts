import { notificationReducer } from './notification.reducer';
import { ShowNotification, RemoveNotification } from '../actions';
import { NotificationTheme } from '../notification/notification.types';

describe('Notification Reducer', () => {
  it('should add a notification on SHOW_NOTIFICATION', () => {
    const state = [];
    const notification = {
      theme: NotificationTheme.SUCCESS,
      message: 'Logged in'
    };
    const newState = notificationReducer(state, new ShowNotification(notification));
    expect(newState).toEqual([notification]);
  });

  it('should remove a notification on REMOVE_NOTIFICATION', () => {
    const notification1 = {
      theme: NotificationTheme.SUCCESS,
      message: 'Logged in'
    };

    const notification2 = {
      theme: NotificationTheme.SUCCESS,
      message: 'Foobar'
    };

    const state = [notification1, notification2];
    const newState = notificationReducer(state, new RemoveNotification(notification2));
    expect(newState).toEqual([notification1]);
  });
});
