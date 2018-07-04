import { Notification } from '../notification/notification.types';
import { NotificationAction, NotificationActionTypes } from '../actions';

export type NotificationState = Notification[];

const initialState: NotificationState = [];

export function notificationReducer(state = initialState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case NotificationActionTypes.SHOW_NOTIFICATION:
      return [...state, action.notification];
    case NotificationActionTypes.REMOVE_NOTIFICATION:
      return state.filter(notification => notification !== action.notification);
    default:
      return state;
  }
}
