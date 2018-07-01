import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { faComment, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { LoginState, getLoadingState, getErrorState, getAuthErrorState } from './reducers/login.reducer';
import { Login } from './actions/login.actions';

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
export class LoginComponent implements AfterViewInit, OnDestroy, OnInit {
  faComment = faComment;
  faExclamationTriangle = faExclamationTriangle;

  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  authError$: Observable<boolean>;

  authErrorSubscription: Subscription;

  loginForm: FormGroup;

  @ViewChild('username') private usernameField: ElementRef;

  constructor(fb: FormBuilder, private title: Title, private store: Store<LoginState>) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loading$ = this.store.select(getLoadingState);
    this.error$ = this.store.select(getErrorState);
    this.authError$ = this.store.select(getAuthErrorState);

    this.authErrorSubscription = this.authError$.subscribe(authError => {
      if (authError) {
        this.usernameField.nativeElement.focus();
        this.loginForm.reset({
          username: '',
          password: ''
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.usernameField.nativeElement.focus();
  }

  ngOnInit(): void {
    this.title.setTitle('shout: Log In');
  }

  ngOnDestroy(): void {
    this.authErrorSubscription.unsubscribe();
  }

  login(): void {
    this.store.dispatch(new Login(this.loginForm.value.username, this.loginForm.value.password));
  }

  hasRequiredError(controlName): boolean {
    const control = this.loginForm.get(controlName);
    return control.errors && control.errors.required && control.touched;
  }
}
