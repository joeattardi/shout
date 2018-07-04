import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { faCheckCircle, faExclamationTriangle, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Notification } from './notification.types';

import { State } from '../../../reducers';
import { RemoveNotification } from '../actions';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() notification: Notification;

  icons = {
    success: faCheckCircle,
    error: faExclamationTriangle,
    info: faInfoCircle,
    close: faTimes
  };

  constructor(private store: Store<State>) {}

  closeButtonClicked(): void {
    this.store.dispatch(new RemoveNotification(this.notification));
  }

  get icon() {
    return this.notification.icon || this.icons[this.notification.theme];
  }
}
