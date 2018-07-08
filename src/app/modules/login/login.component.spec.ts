import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { LoginComponent } from './login.component';
import { Login } from './actions/login.actions';

import { MockStore } from '../../testing/store.mock';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let mockStore: MockStore<any>;

  beforeEach(() => {
    mockStore = new MockStore({
      login: {
        loading: false,
        error: false,
        authError: false
      }
    });

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: Store,
          useValue: mockStore
        }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
  });

  it('should disable the login button when the form is empty', () => {
    const loginButton = fixture.nativeElement.querySelector('#button-container button');
    expect(loginButton.disabled).toBe(true);
  });

  it('should require the username field', () => {
    const usernameField = fixture.nativeElement.querySelector('#username');
    expect(usernameField.classList).toContain('ng-invalid');

    usernameField.value = 'foo';
    usernameField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(usernameField.classList).toContain('ng-valid');
  });

  it('should require the password field', () => {
    const passwordField = fixture.nativeElement.querySelector('#password');
    expect(passwordField.classList).toContain('ng-invalid');

    passwordField.value = 'foo';
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(passwordField.classList).toContain('ng-valid');
  });

  it('should enable the login button when the form is valid', () => {
    const usernameField = fixture.nativeElement.querySelector('#username');
    usernameField.value = 'foo';
    usernameField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const passwordField = fixture.nativeElement.querySelector('#password');
    passwordField.value = 'bar';
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const loginButton = fixture.nativeElement.querySelector('#button-container button');
    expect(loginButton.disabled).toBe(false);
  });

  it('should dispatch a LOGIN action when clicking the login button', () => {
    spyOn(mockStore, 'dispatch');

    const usernameField = fixture.nativeElement.querySelector('#username');
    usernameField.value = 'foo';
    usernameField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const passwordField = fixture.nativeElement.querySelector('#password');
    passwordField.value = 'bar';
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const loginButton = fixture.nativeElement.querySelector('#button-container button');
    loginButton.click();

    expect(mockStore.dispatch).toHaveBeenCalledWith(new Login('foo', 'bar'));
  });

  it('should show an error when the username or password is incorrect', () => {
    mockStore.next({
      login: {
        loading: false,
        error: false,
        authError: true
      }
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#auth-error')).toBeDefined();
  });

  it('should show a loading spinner and disable the login button while loading', () => {
    const usernameField = fixture.nativeElement.querySelector('#username');
    usernameField.value = 'foo';
    usernameField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const passwordField = fixture.nativeElement.querySelector('#password');
    passwordField.value = 'bar';
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    mockStore.next({
      login: {
        loading: true,
        error: false,
        authError: false
      }
    });
    fixture.detectChanges();

    const loginButton = fixture.nativeElement.querySelector('#button-container button');
    expect(loginButton.disabled).toBe(true);

    expect(loginButton.querySelector('app-spinner')).toBeDefined();
  });

  it('should show an error when there was an error', () => {
    mockStore.next({
      login: {
        loading: false,
        error: true,
        authError: false
      }
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#login-error')).toBeDefined();
  });
});
