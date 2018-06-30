import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';
import { UserService } from './user.service';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, HttpClientModule],
  providers: [AuthService, UserService]
})
export class CoreModule {}
