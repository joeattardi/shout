import { trigger, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { fadeAnimation } from './fade.animation';

import { NotificationService } from './modules/core/notification/notification.service';
import { NotificationTheme } from './modules/core/notification/notification.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeAnimation,
    trigger('notification', [
      transition(':enter', [
        style({ opacity: 0, transform: 'rotateX(90deg) translateY(-5em)' }),
        animate('0.2s', style({ opacity: 1, transform: 'rotateX(0deg) translateY(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'rotateX(0deg)' }),
        animate('0.2s', style({ opacity: 0, transform: 'rotateX(90deg)' }))
      ])
    ])
  ]
})
export class AppComponent {
  notification = {
    message: 'Hello',
    theme: NotificationTheme.SUCCESS
  };

  constructor(private notificationService: NotificationService) {}

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  get notifications() {
    return this.notificationService.notifications;
  }
}
