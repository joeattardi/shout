import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { State } from '../../../reducers';
import { Notification } from './notification.types';
import { ShowNotification, RemoveNotification } from '../actions';

@Injectable()
export class NotificationService {
  constructor(private store: Store<State>) {}

  showNotification(notificationToShow: Notification) {
    this.store.dispatch(new ShowNotification(notificationToShow));

    if (!notificationToShow.sticky) {
      setTimeout(() => this.store.dispatch(new RemoveNotification(notificationToShow)), 5000);
    }
  }
}
