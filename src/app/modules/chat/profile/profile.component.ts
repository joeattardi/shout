import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../core/core.types';

import { SaveProfile } from '../actions';
import { getProfileLoadingState, getProfileErrorState, getProfileAuthErrorState } from '../reducers';
import { getUserState } from '../../../reducers/user.reducer';
import { State } from '../../../reducers';

import { emailValidator, passwordMatchValidator } from '../../shared/validators';

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
export class ProfileComponent implements AfterViewInit, OnDestroy, OnInit {
  icons = {
    error: faExclamationTriangle
  };

  private destroy$ = new Subject<void>();

  form: FormGroup;

  user: User;

  loading$: Observable<boolean>;

  error$: Observable<boolean>;

  authError$: Observable<boolean>;

  @ViewChild('firstName') firstNameField: ElementRef;

  @ViewChild('mainColumn') mainColumn: ElementRef;

  constructor(private router: Router, fb: FormBuilder, private store: Store<State>) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      currentPassword: [''],
      password: [''],
      confirmPassword: ['']
    });

    this.loading$ = this.store.select(getProfileLoadingState);

    this.error$ = this.store.select(getProfileErrorState);
    this.error$.pipe(takeUntil(this.destroy$)).subscribe(error => {
      if (error) {
        this.mainColumn.nativeElement.scrollTop = 0;
      }
    });

    this.authError$ = this.store.select(getProfileAuthErrorState);
    this.authError$.pipe(takeUntil(this.destroy$)).subscribe(authError => {
      if (authError) {
        this.form.patchValue({
          currentPassword: '',
          password: '',
          confirmPassword: ''
        });

        this.mainColumn.nativeElement.scrollTop = 0;
      }
    });

    this.store
      .select(getUserState)
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;

        if (user) {
          this.form.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
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
    const formValue = this.form.value;

    this.store.dispatch(
      new SaveProfile({
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        currentPassword: formValue.currentPassword,
        newPassword: formValue.password
      })
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
}
