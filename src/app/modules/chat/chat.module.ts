import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [AuthGuard],
  declarations: [ChatComponent]
})
export class ChatModule {}
