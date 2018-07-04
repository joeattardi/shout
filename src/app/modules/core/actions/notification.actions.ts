import { Action } from '@ngrx/store';
import { Notification } from '../notification/notification.types';

export enum NotificationActionTypes {
  SHOW_NOTIFICATION = '[Notification] show notification',
  REMOVE_NOTIFICATION = '[Notification] remove notification'
}

export class ShowNotification implements Action {
  readonly type = NotificationActionTypes.SHOW_NOTIFICATION;
  constructor(public notification: Notification) {}
}

export class RemoveNotification implements Action {
  readonly type = NotificationActionTypes.REMOVE_NOTIFICATION;
  constructor(public notification: Notification) {}
}

export type NotificationAction = ShowNotification | RemoveNotification;
