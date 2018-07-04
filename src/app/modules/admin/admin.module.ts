import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';

import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';

import { AdminGuard } from './admin-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: AdminComponent
  }
];

@NgModule({
  imports: [CommonModule, FontAwesomeModule, RouterModule.forChild(routes), SharedModule],
  providers: [AdminGuard],
  declarations: [AdminComponent, HeaderComponent]
})
export class AdminModule {}
