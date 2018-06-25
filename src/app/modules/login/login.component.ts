import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { faComment, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../core/auth.service';
import { LoginService } from './login.service';

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
  providers: [LoginService],
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
    private loginService: LoginService,
    private title: Title,
    private router: Router,
    private authService: AuthService
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
    this.title.setTitle('Shout: Log In');
  }

  login(): void {
    this.state = State.LOADING;
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      result => {
        this.state = State.NORMAL;
        this.authService.loggedIn = true;
        this.router.navigate(['/chat']);
      },
      errorResponse => {
        if (errorResponse.status === 403) {
          this.state = State.LOGIN_INCORRECT;
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
