import { Component, Input, Output, EventEmitter } from '@angular/core';

import { faCheckCircle, faExclamationTriangle, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Notification } from './notification.types';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() notification: Notification;

  @Output() remove = new EventEmitter<void>();

  icons = {
    success: faCheckCircle,
    error: faExclamationTriangle,
    info: faInfoCircle,
    close: faTimes
  };

  closeButtonClicked(): void {
    this.remove.emit();
  }

  get icon() {
    return this.notification.icon || this.icons[this.notification.theme];
  }
}
