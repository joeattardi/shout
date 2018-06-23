import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AfterViewInit, ElementRef, Component, ViewChild } from '@angular/core';

import { faComment, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { SignUpService } from './sign-up.service';

function passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
  const password = form.get('password').value;
  const confirmPassword = form.get('confirmPassword').value;

  if (password !== confirmPassword) {
    return { passwordMatch: true };
  }

  return null;
}

enum State {
  NORMAL,
  LOADING,
  ERROR
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [SignUpService]
})
export class SignUpComponent implements AfterViewInit {
  faComment = faComment;
  faExclamationTriangle = faExclamationTriangle;

  state: State = State.NORMAL;

  signupForm: FormGroup;

  private loadingTimeout;

  @ViewChild('firstName') private firstNameField: ElementRef;

  constructor(fb: FormBuilder, private signUpService: SignUpService) {
    this.signupForm = fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: passwordMatchValidator
      }
    );
  }

  ngAfterViewInit() {
    this.firstNameField.nativeElement.focus();
  }

  onSubmit(): void {
    const formValue = this.signupForm.value;

    this.loadingTimeout = setTimeout(() => {
      this.state = State.LOADING;
    }, 500);

    this.signUpService.signup(formValue.firstName, formValue.lastName, formValue.username, formValue.password).subscribe(
      result => {
        if (this.loadingTimeout) {
          clearTimeout(this.loadingTimeout);
        }
        this.state = State.NORMAL;
        console.log('Signup result:', result);
      },
      error => {
        if (this.loadingTimeout) {
          clearTimeout(this.loadingTimeout);
        }
        this.state = State.ERROR;
      }
    );
  }

  get isNormalState(): boolean {
    return this.state === State.NORMAL;
  }

  get isErrorState(): boolean {
    return this.state === State.ERROR;
  }

  get isLoadingState(): boolean {
    return this.state === State.LOADING;
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
