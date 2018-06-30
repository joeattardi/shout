import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../core/auth.service';
import { User } from '../../core/core.types';
import { UserService } from '../../core/user.service';
import { emailValidator, passwordMatchValidator } from '../../shared/validators';

enum State {
  NORMAL,
  SAVING,
  PASSWORD_INCORRECT,
  ERROR
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1, transform: 'rotateX(0deg)' })),
      transition(':enter', [style({ opacity: 0, transform: 'rotateX(90deg)' }), animate('0.2s')])
    ])
  ]
})
export class ProfileComponent implements AfterViewInit, OnInit {
  icons = {
    error: faExclamationTriangle
  };

  form: FormGroup;

  state = State.NORMAL;

  user: User;

  identiconUsername: string;

  @ViewChild('firstName') firstNameField: ElementRef;

  @ViewChild('mainColumn') mainColumn: ElementRef;

  constructor(private authService: AuthService, private router: Router, fb: FormBuilder, private userService: UserService) {
    this.user = authService.currentUser;
    this.identiconUsername = this.user.username;

    this.form = fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.compose([Validators.required, emailValidator])],
      currentPassword: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {
    this.form.get('password').valueChanges.subscribe((password: string) => {
      const currentPasswordControl = this.form.get('currentPassword');
      const confirmPasswordControl = this.form.get('confirmPassword');

      if (password.length) {
        currentPasswordControl.setValidators([Validators.required]);
        confirmPasswordControl.setValidators([Validators.required]);
        this.form.setValidators(passwordMatchValidator);
      } else {
        currentPasswordControl.setValidators([]);
        confirmPasswordControl.setValidators([]);
        this.form.setValidators([]);
      }

      this.form.updateValueAndValidity();
      currentPasswordControl.updateValueAndValidity();
      confirmPasswordControl.updateValueAndValidity();
    });
  }

  ngAfterViewInit(): void {
    this.firstNameField.nativeElement.focus();
  }

  closeModal(): void {
    this.router.navigate(['/chat']);
  }

  onSubmit(): void {
    this.state = State.SAVING;

    const formValue = this.form.value;
    this.userService
      .updateProfile(formValue.firstName, formValue.lastName, formValue.email, formValue.currentPassword, formValue.password)
      .subscribe(
        () => {
          this.closeModal();
        },
        errorResponse => {
          if (errorResponse.status === 403) {
            this.state = State.PASSWORD_INCORRECT;
            this.form.patchValue({
              currentPassword: '',
              password: '',
              confirmPassword: ''
            });
          } else {
            this.state = State.ERROR;
          }

          this.mainColumn.nativeElement.scrollTop = 0;
        }
      );
  }

  hasRequiredError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control.errors && control.errors.required && control.touched;
  }

  get hasInvalidEmailError(): boolean {
    const control = this.form.get('email');
    return control.errors && !control.errors.required && control.errors.email && control.touched;
  }

  get hasEmailError(): boolean {
    const control = this.form.get('email');
    return control.errors !== null && control.touched;
  }

  get hasPasswordMatchError(): boolean {
    return this.form.errors && this.form.errors.passwordMatch && this.form.get('confirmPassword').touched;
  }

  get hasConfirmPasswordError(): boolean {
    return this.hasRequiredError('confirmPassword') || this.hasPasswordMatchError;
  }

  get isSavingState(): boolean {
    return this.state === State.SAVING;
  }

  get isNormalState(): boolean {
    return this.state === State.NORMAL;
  }

  get isErrorState(): boolean {
    return this.state === State.ERROR;
  }

  get isPasswordIncorrectState(): boolean {
    return this.state === State.PASSWORD_INCORRECT;
  }
}
