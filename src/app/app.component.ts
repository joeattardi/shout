import { trigger, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { fadeAnimation } from './fade.animation';

import { AuthService } from './modules/core/auth.service';
import { Notification } from './modules/core/notification/notification.types';

import { State } from './reducers';
import { getNotificationState } from './modules/core/reducers';
import { GetCurrentUser } from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeAnimation,
    trigger('notification', [
      transition(':enter', [
        style({ opacity: 0, transform: 'rotateX(90deg)' }),
        animate('0.2s', style({ opacity: 1, transform: 'rotateX(0deg)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'rotateX(0deg)' }),
        animate('0.2s', style({ opacity: 0, transform: 'rotateX(90deg)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  notifications$: Observable<Notification[]>;

  constructor(private store: Store<State>, private authService: AuthService) {
    this.notifications$ = this.store.select(getNotificationState);
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.store.dispatch(new GetCurrentUser());
    }
  }

  getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
