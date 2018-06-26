import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPopperModule } from 'ngx-popper';

import { AuthGuard } from './auth-guard.service';
import { ChatComponent } from './chat.component';
import { HeaderComponent } from './header.component';

import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ChatComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    NgxPopperModule.forRoot({
      disableDefaultStyling: true
    }),
    SharedModule
  ],
  providers: [AuthGuard],
  declarations: [ChatComponent, HeaderComponent]
})
export class ChatModule {}
