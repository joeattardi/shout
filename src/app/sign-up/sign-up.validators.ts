import { AbstractControl, ValidationErrors } from '@angular/forms';
import { validate } from 'email-validator';

export function passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
  const password = form.get('password').value;
  const confirmPassword = form.get('confirmPassword').value;

  if (password !== confirmPassword) {
    return { passwordMatch: true };
  }

  return null;
}

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  if (!validate(control.value)) {
    return { email: true };
  }

  return null;
}
