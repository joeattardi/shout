import { Injectable } from '@angular/core';

import { Notification } from './notification.types';

@Injectable()
export class NotificationService {
  notifications: Notification[] = [];

  showNotification(notificationToShow: Notification) {
    this.notifications = [notificationToShow, ...this.notifications];

    if (!notificationToShow.sticky) {
      setTimeout(() => this.removeNotification(notificationToShow), 5000);
    }
  }

  removeNotification(notificationToRemove: Notification) {
    this.notifications = this.notifications.filter(notification => notification !== notificationToRemove);
  }
}
