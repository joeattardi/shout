import { AbstractControl, ValidationErrors } from '@angular/forms';

import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { validate } from 'email-validator';

import { AuthService } from '../core/auth.service';

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

export function usernameTakenValidator(authService: AuthService) {
  return (control: AbstractControl) => {
    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => authService.checkUsernameTaken(value)),
      map(res => {
        if (res['result'] === 'taken') {
          return control.setErrors({ usernameTaken: true });
        }

        return control.setErrors(null);
      })
    );
  };
}
