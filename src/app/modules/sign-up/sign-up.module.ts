import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { SignUpComponent } from './sign-up.component';

import { signUpReducer } from './reducers/sign-up.reducer';
import { SignUpEffects } from './effects/sign-up.effects';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
    StoreModule.forFeature('signUp', signUpReducer),
    EffectsModule.forFeature([SignUpEffects])
  ],
  declarations: [SignUpComponent]
})
export class SignUpModule {}
