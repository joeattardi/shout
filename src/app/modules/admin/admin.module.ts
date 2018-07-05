import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';

import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { RoomsComponent } from './rooms/rooms.component';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';

import { AdminGuard } from './admin-guard.service';
import { AdminService } from './admin.service';

import { reducers } from './reducers';
import { UsersEffects } from './effects';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: AdminComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'rooms',
        component: RoomsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('admin', reducers),
    EffectsModule.forFeature([UsersEffects])
  ],
  providers: [AdminGuard, AdminService],
  declarations: [AdminComponent, HeaderComponent, RoomsComponent, UsersComponent, UserListComponent]
})
export class AdminModule {}
