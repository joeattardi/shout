import { fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';
import { of } from 'rxjs';

import { passwordMatchValidator, emailValidator, usernameTakenValidator } from './validators';

describe('validators', () => {
  const fb = new FormBuilder();

  describe('passwordMatchValidator', () => {
    it('should be valid if the passwords match', () => {
      const form = fb.group({
        password: 'abc123',
        confirmPassword: 'abc123'
      });

      expect(passwordMatchValidator(form)).toBeNull();
    });

    it('should be invalid if the passwords do not match', () => {
      const form = fb.group({
        password: 'abc123',
        confirmPassword: 'def456'
      });

      expect(passwordMatchValidator(form)).toEqual({ passwordMatch: true });
    });
  });

  describe('emailValidator', () => {
    it('should be valid if the email address is valid', () => {
      const control = new FormControl('joe@foo.com');
      expect(emailValidator(control)).toBeNull();
    });

    it('should be invalid if the email address is invalid', () => {
      const control = new FormControl('invalidemail');
      expect(emailValidator(control)).toEqual({ email: true });

      control.setValue('invalid@invalid@invalid');
      expect(emailValidator(control)).toEqual({ email: true });
    });
  });

  describe('usernameTakenValidator', () => {
    it(
      'should be valid if the username is available',
      fakeAsync(() => {
        const control = new FormControl();
        const validator = usernameTakenValidator(value => of({ result: 'available' }));
        const result = validator(control);
        result.subscribe(validationResult => {
          expect(validationResult).toBeNull();
        });

        control.setValue('joe');
        tick(500);
      })
    );

    it(
      'should be invalid if the username is taken',
      fakeAsync(() => {
        const control = new FormControl();
        const validator = usernameTakenValidator(value => of({ result: 'taken' }));
        const result = validator(control);
        result.subscribe(validationResult => {
          expect(validationResult).toEqual({ usernameTaken: true });
        });

        control.setValue('joe');
        tick(500);
      })
    );
  });
});
