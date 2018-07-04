import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: AdminComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [AdminGuard],
  declarations: [AdminComponent]
})
export class AdminModule {}
