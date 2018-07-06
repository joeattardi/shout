import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { emailValidator, passwordMatchValidator, usernameTakenValidator } from '../../../shared/validators';

import { State } from '../../../../reducers';

import { AdminService } from '../../admin.service';
import { LoadUser, SaveUser, DeleteUser } from '../../actions';
import { EditUserState } from '../../reducers/users.reducer';
import { getUserEditState } from '../../reducers';

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1, transform: 'rotateX(0deg)' })),
      transition(':enter', [style({ opacity: 0, transform: 'rotateX(90deg)' }), animate('0.2s')])
    ])
  ]
})
export class EditUserComponent implements AfterViewInit, OnDestroy, OnInit {
  private destroy$ = new Subject<void>();

  icons = {
    error: faExclamationTriangle
  };

  form: FormGroup;

  formInitialized = false;

  identiconUsername: string;

  userEditState: EditUserState;

  @ViewChild('firstName') firstNameField: ElementRef;

  @ViewChild('mainColumn') mainColumn: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>,
    fb: FormBuilder,
    adminService: AdminService
  ) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      admin: [false],
      password: [''],
      confirmPassword: ['']
    });

    this.store
      .select(getUserEditState)
      .pipe(takeUntil(this.destroy$))
      .subscribe(userEditState => {
        this.userEditState = userEditState;

        if (this.userEditState.user && !this.formInitialized) {
          this.identiconUsername = this.userEditState.user.username;

          this.form.patchValue({
            firstName: this.userEditState.user.firstName,
            lastName: this.userEditState.user.lastName,
            username: this.userEditState.user.username,
            email: this.userEditState.user.email,
            admin: this.userEditState.user.admin
          });

          this.formInitialized = true;

          this.form
            .get('username')
            .setAsyncValidators(usernameTakenValidator(username => adminService.checkUsernameTaken(username, this.userEditState.user.id)));
        }

        if (this.userEditState.error) {
          this.mainColumn.nativeElement.scrollTop = 0;
        }
      });
  }

  onSubmit(): void {
    const formValue = this.form.value;

    this.store.dispatch(
      new SaveUser(this.userEditState.user.id, {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        username: formValue.username,
        email: formValue.email,
        password: formValue.password,
        admin: formValue.admin
      })
    );
  }

  ngAfterViewInit(): void {
    this.firstNameField.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    const userId = parseInt(this.route.snapshot.params.id, 10);
    if (userId) {
      this.store.dispatch(new LoadUser(userId));
    }

    this.form
      .get('username')
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((username: string) => {
        this.identiconUsername = username;
      });

    this.form
      .get('password')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((password: string) => {
        const confirmPasswordControl = this.form.get('confirmPassword');

        if (password.length) {
          confirmPasswordControl.setValidators([Validators.required]);
          this.form.setValidators(passwordMatchValidator);
        } else {
          confirmPasswordControl.setValidators([]);
          this.form.setValidators([]);
        }

        this.form.updateValueAndValidity();
        confirmPasswordControl.updateValueAndValidity();
      });
  }

  closeModal(): void {
    this.router.navigate(['/admin', 'users']);
  }

  deleteUser(): void {
    this.store.dispatch(new DeleteUser(this.userEditState.user));
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

  get hasUsernameTakenError(): boolean {
    const control = this.form.get('username');
    return control.errors && !control.errors.required && control.errors.usernameTaken && control.touched;
  }

  get hasUsernameError(): boolean {
    return this.hasRequiredError('username') || this.hasUsernameTakenError;
  }
}
