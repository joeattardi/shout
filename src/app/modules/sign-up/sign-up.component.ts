import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, ElementRef, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { faComment, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../core/auth.service';

import { emailValidator, passwordMatchValidator, usernameTakenValidator } from '../shared/validators';
import { SignUpState, getLoadingState, getErrorState } from './reducers/sign-up.reducer';
import { SignUp } from './actions/sign-up.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1, transform: 'rotateX(0deg)' })),
      transition(':enter', [style({ opacity: 0, transform: 'rotateX(90deg)' }), animate('0.2s')])
    ])
  ]
})
export class SignUpComponent implements AfterViewInit, OnInit {
  faComment = faComment;
  faExclamationTriangle = faExclamationTriangle;

  loading$: Observable<boolean>;

  error$: Observable<boolean>;

  signupForm: FormGroup;

  @ViewChild('firstName') private firstNameField: ElementRef;

  constructor(fb: FormBuilder, private title: Title, private authService: AuthService, private store: Store<SignUpState>) {
    this.signupForm = fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, emailValidator])],
        username: ['', Validators.required, usernameTakenValidator(this.authService)],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: passwordMatchValidator
      }
    );

    this.loading$ = this.store.select(getLoadingState);
    this.error$ = this.store.select(getErrorState);
  }

  ngOnInit(): void {
    this.title.setTitle('shout: Sign Up');
  }

  ngAfterViewInit(): void {
    this.firstNameField.nativeElement.focus();
  }

  onSubmit(): void {
    const formValue = this.signupForm.value;
    this.store.dispatch(new SignUp(formValue.firstName, formValue.lastName, formValue.email, formValue.username, formValue.password));
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

  get hasEmailError(): boolean {
    const control = this.signupForm.get('email');
    return control.errors !== null && control.touched;
  }

  get hasInvalidEmailError(): boolean {
    const control = this.signupForm.get('email');
    return control.errors && !control.errors.required && control.errors.email && control.touched;
  }

  get hasUsernameTakenError(): boolean {
    const control = this.signupForm.get('username');
    return control.errors && !control.errors.required && control.errors.usernameTaken && control.touched;
  }

  get hasUsernameError(): boolean {
    return this.hasRequiredError('username') || this.hasUsernameTakenError;
  }
}
