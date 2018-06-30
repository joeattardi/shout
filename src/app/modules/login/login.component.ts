import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { faComment, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../core/auth.service';
import { NotificationService } from '../core/notification/notification.service';
import { NotificationTheme } from '../core/notification/notification.types';

enum State {
  NORMAL,
  LOADING,
  ERROR,
  LOGIN_INCORRECT
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1, transform: 'rotateX(0deg)' })),
      transition(':enter', [style({ opacity: 0, transform: 'rotateX(90deg)' }), animate('0.2s')])
    ])
  ]
})
export class LoginComponent implements AfterViewInit, OnInit {
  faComment = faComment;
  faExclamationTriangle = faExclamationTriangle;

  state: State = State.NORMAL;

  loginForm: FormGroup;

  @ViewChild('username') private usernameField: ElementRef;

  constructor(
    fb: FormBuilder,
    private title: Title,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.usernameField.nativeElement.focus();
  }

  ngOnInit(): void {
    this.title.setTitle('shout: Log In');
  }

  login(): void {
    this.state = State.LOADING;
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      (result: any) => {
        this.state = State.NORMAL;
        this.authService.currentUser = result.user;
        this.router.navigate(['/chat']);
        this.notificationService.showNotification({
          theme: NotificationTheme.SUCCESS,
          message: `Welcome back, ${result.user.firstName}!`,
          icon: faComment
        });
      },
      errorResponse => {
        if (errorResponse.status === 403) {
          this.state = State.LOGIN_INCORRECT;
          this.loginForm.patchValue({
            password: ''
          });
        } else {
          this.state = State.ERROR;
        }
      }
    );
  }

  hasRequiredError(controlName): boolean {
    const control = this.loginForm.get(controlName);
    return control.errors && control.errors.required && control.touched;
  }

  get isNormalState() {
    return this.state === State.NORMAL;
  }

  get isLoadingState() {
    return this.state === State.LOADING;
  }

  get isLoginIncorrectState() {
    return this.state === State.LOGIN_INCORRECT;
  }

  get isErrorState() {
    return this.state === State.ERROR;
  }
}
