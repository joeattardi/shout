import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignUpComponent],
      schemas: [NO_ERRORS_SCHEMA]
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
