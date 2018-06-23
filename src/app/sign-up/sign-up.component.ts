import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { faComment } from '@fortawesome/free-solid-svg-icons';

function passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
  const password = form.get('password').value;
  const confirmPassword = form.get('confirmPassword').value;

  if (password !== confirmPassword) {
    return { passwordMatch: true };
  }

  return null;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  faComment = faComment;

  signupForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.signupForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: passwordMatchValidator
    });
  }

  hasRequiredError(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    return control.errors && control.errors.required && control.touched;
  }

  get hasPasswordMatchError(): boolean {
    return this.signupForm.errors && this.signupForm.errors.passwordMatch && this.signupForm.get('confirmPassword').touched;
  }

  get hasConfirmPasswordError(): boolean {
    return this.hasRequiredError('confirmPassword') || this.hasPasswordMatchError;
  }
}
