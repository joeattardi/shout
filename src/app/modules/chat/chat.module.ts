import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthGuard } from './auth-guard.service';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ChatComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FontAwesomeModule],
  providers: [AuthGuard],
  declarations: [ChatComponent]
})
export class ChatModule {}
