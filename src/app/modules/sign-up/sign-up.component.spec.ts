import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthService } from '../core/auth.service';
import { SignUpComponent } from './sign-up.component';
import { dispatch } from '../../../../node_modules/rxjs/internal/observable/range';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  const mockAuthService = {};

  const mockStore = {
    select() {},
    dispatch() {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      declarations: [SignUpComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AuthService, useValue: mockAuthService }, { provide: Store, useValue: mockStore }]
    });

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
  });

  function checkRequired(controlName) {
    const control = component.signupForm.get(controlName);
    control.setValue('');
    fixture.detectChanges();
    expect(control.errors.required).toBeTruthy();

    control.setValue('foo');
    fixture.detectChanges();
    expect(control.errors).toBeNull();
  }

  it('should require the first name', () => {
    checkRequired('firstName');
  });

  it('should require the last name', () => {
    checkRequired('lastName');
  });

  it('should require the username', () => {
    checkRequired('username');
  });

  it('should require the password', () => {
    checkRequired('password');
  });

  it('should require the password confirmation', () => {
    checkRequired('confirmPassword');
  });

  it('should have a validation error if the passwords dont match', () => {
    const password = component.signupForm.get('password');
    password.setValue('abc123');

    const confirmPassword = component.signupForm.get('confirmPassword');
    confirmPassword.setValue('foobar');

    expect(component.signupForm.hasError('passwordMatch')).toBe(true);

    confirmPassword.setValue('abc123');
    expect(component.signupForm.hasError('passwordMatch')).toBe(false);
  });
});
