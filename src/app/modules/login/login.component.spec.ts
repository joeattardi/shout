import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { LoginComponent } from './login.component';
import { Login } from './actions/login.actions';

import { MockStore } from '../../testing/store.mock';
import { checkRequired, setFieldValue } from '../../testing/test-helpers';

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
    checkRequired(fixture, '#username');
  });

  it('should require the password field', () => {
    checkRequired(fixture, '#password');
  });

  it('should enable the login button when the form is valid', () => {
    const usernameField = fixture.nativeElement.querySelector('#username');
    setFieldValue(fixture, usernameField, 'foo');

    const passwordField = fixture.nativeElement.querySelector('#password');
    setFieldValue(fixture, passwordField, 'bar');

    const loginButton = fixture.nativeElement.querySelector('#button-container button');
    expect(loginButton.disabled).toBe(false);
  });

  it('should dispatch a LOGIN action when clicking the login button', () => {
    spyOn(mockStore, 'dispatch');

    const usernameField = fixture.nativeElement.querySelector('#username');
    setFieldValue(fixture, usernameField, 'foo');

    const passwordField = fixture.nativeElement.querySelector('#password');
    setFieldValue(fixture, passwordField, 'bar');

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
    setFieldValue(fixture, usernameField, 'foo');

    const passwordField = fixture.nativeElement.querySelector('#password');
    setFieldValue(fixture, passwordField, 'bar');

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
