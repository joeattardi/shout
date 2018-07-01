import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, HostBinding } from '@angular/core';

import { faCheckCircle, faExclamationTriangle, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Notification } from './notification.types';
import { NotificationService } from './notification.service';

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

  constructor(private notificationService: NotificationService) {}

  closeButtonClicked(): void {
    this.notificationService.removeNotification(this.notification);
  }

  get icon() {
    return this.notification.icon || this.icons[this.notification.theme];
  }
}
