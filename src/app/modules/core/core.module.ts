import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthService } from './auth.service';
import { UserService } from './user.service';

import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification/notification.service';

import { reducers } from './reducers';

@NgModule({
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  imports: [CommonModule, BrowserAnimationsModule, HttpClientModule, FontAwesomeModule, StoreModule.forFeature('core', reducers)],
  providers: [AuthService, UserService, NotificationService]
})
export class CoreModule {}
