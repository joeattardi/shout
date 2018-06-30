import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPopperModule } from 'ngx-popper';

import { AuthGuard } from './auth-guard.service';
import { ChatComponent } from './chat/chat.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';

import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ChatComponent,
    children: [{ path: 'edit-profile', component: ProfileComponent }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    NgxPopperModule.forRoot({
      disableDefaultStyling: true
    }),
    SharedModule
  ],
  providers: [AuthGuard],
  declarations: [ChatComponent, HeaderComponent, ProfileComponent]
})
export class ChatModule {}
