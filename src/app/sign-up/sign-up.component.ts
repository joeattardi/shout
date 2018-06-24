import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AfterViewInit, ElementRef, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { faComment, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { emailValidator, passwordMatchValidator } from './sign-up.validators';
import { SignUpService } from './sign-up.service';

enum State {
  NORMAL,
  LOADING,
  ERROR
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [SignUpService],
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

  state: State = State.NORMAL;

  signupForm: FormGroup;

  private loadingTimeout;

  @ViewChild('firstName') private firstNameField: ElementRef;

  constructor(fb: FormBuilder, private signUpService: SignUpService, private title: Title) {
    this.signupForm = fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, emailValidator])],
        username: ['', Validators.required, this.validateUsernameTaken.bind(this)],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: passwordMatchValidator
      }
    );
  }

  ngOnInit(): void {
    this.title.setTitle('Shout: Sign Up');
  }

  ngAfterViewInit(): void {
    this.firstNameField.nativeElement.focus();
  }

  validateUsernameTaken(control: AbstractControl) {
    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => this.signUpService.checkUsernameTaken(value)),
      map(res => {
        if (res['result'] === 'taken') {
          return control.setErrors({ usernameTaken: true });
        }

        return control.setErrors(null);
      })
    );
  }

  onSubmit(): void {
    const formValue = this.signupForm.value;

    this.loadingTimeout = setTimeout(() => {
      this.state = State.LOADING;
    }, 500);

    this.signUpService.signup(formValue.firstName, formValue.lastName, formValue.email, formValue.username, formValue.password).subscribe(
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
}
