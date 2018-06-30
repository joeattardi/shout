import { Component } from '@angular/core';
import { fadeAnimation } from './fade.animation';

import { NotificationService } from './modules/core/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  constructor(private notificationService: NotificationService) {}

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  get notifications() {
    return this.notificationService.notifications;
  }
}
