import { AbstractControl, ValidationErrors } from '@angular/forms';

import { debounceTime, map, distinctUntilChanged, switchMap, first } from 'rxjs/operators';
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

export function usernameTakenValidator(checkFn) {
  return (control: AbstractControl) => {
    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => checkFn(value)),
      map(res => {
        if (res['result'] === 'taken') {
          return { usernameTaken: true };
        } else {
          return null;
        }
      }),
      first()
    );
  };
}
