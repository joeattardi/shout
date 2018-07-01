import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';

import { loginReducer } from './reducers/login.reducer';
import { LoginEffects } from './effects/login.effects';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('login', loginReducer),
    EffectsModule.forFeature([LoginEffects])
  ],
  declarations: [LoginComponent]
})
export class LoginModule {}
