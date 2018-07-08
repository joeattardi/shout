import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { MockStore } from '../../../testing/store.mock';
import { checkRequired, setFieldValue } from '../../../testing/test-helpers';

import { ProfileComponent } from './profile.component';
import { SaveProfile } from '../actions';

const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('ProfileComponent', () => {
  let fixture: ComponentFixture<ProfileComponent>;
  let mockStore: MockStore<any>;

  beforeEach(() => {
    mockStore = new MockStore({
      user: {
        id: 4,
        username: 'joe',
        firstName: 'Joe',
        lastName: 'Foo',
        email: 'joe@foo.com',
        admin: false
      },
      chat: {
        profile: {
          loading: false,
          error: false,
          authError: false
        }
      }
    });

    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: Store,
          useValue: mockStore
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    });

    fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
  });

  it('should populate the form with the profile data', () => {
    const firstNameField = fixture.nativeElement.querySelector('#first-name');
    expect(firstNameField.value).toBe('Joe');

    const lastNameField = fixture.nativeElement.querySelector('#last-name');
    expect(lastNameField.value).toBe('Foo');

    const emailField = fixture.nativeElement.querySelector('#email');
    expect(emailField.value).toBe('joe@foo.com');
  });

  it('should require the first name', () => {
    checkRequired(fixture, '#first-name');
  });

  it('should require the last name', () => {
    checkRequired(fixture, '#last-name');
  });

  it('should require the email', () => {
    checkRequired(fixture, '#email', 'joe@foo.com');
  });

  it('should require a valid email address', () => {
    const emailField = fixture.nativeElement.querySelector('#email');
    setFieldValue(fixture, emailField, 'invalidEmail');
    expect(emailField.classList).toContain('ng-invalid');
    expect(emailField.classList).toContain('error');

    setFieldValue(fixture, emailField, 'joe@invalid@email@');
    expect(emailField.classList).toContain('ng-invalid');
    expect(emailField.classList).toContain('error');

    setFieldValue(fixture, emailField, 'joe@foo.com');
    expect(emailField.classList).toContain('ng-valid');
    expect(emailField.classList).not.toContain('error');
  });

  it('should not require the current password if a new password is not entered', () => {
    const currentPasswordField = fixture.nativeElement.querySelector('#current-password');
    expect(currentPasswordField.classList).toContain('ng-valid');
  });

  it('should require the current password if a new password is entered', () => {
    const newPasswordField = fixture.nativeElement.querySelector('#password');
    setFieldValue(fixture, newPasswordField, 'abc123');
    checkRequired(fixture, '#current-password');
  });

  it('should mark the confirm password field as invalid if the passwords do not match', () => {
    const passwordField = fixture.nativeElement.querySelector('#password');
    setFieldValue(fixture, passwordField, 'abc123');

    const confirmPasswordField = fixture.nativeElement.querySelector('#confirm-password');
    setFieldValue(fixture, confirmPasswordField, 'def456');

    expect(confirmPasswordField.classList).toContain('error');

    setFieldValue(fixture, confirmPasswordField, 'abc123');
    expect(confirmPasswordField.classList).not.toContain('error');
  });

  it('should disable the save button if the form becomes invalid', () => {
    const saveButton = fixture.nativeElement.querySelector('.button-primary');
    expect(saveButton.disabled).toBe(false);

    const firstNameField = fixture.nativeElement.querySelector('#first-name');
    setFieldValue(fixture, firstNameField, '');
    expect(saveButton.disabled).toBe(true);

    setFieldValue(fixture, firstNameField, 'Bob');
    expect(saveButton.disabled).toBe(false);
  });

  it('should clear all password fields and show an error message when there is an auth error', () => {
    const currentPasswordField = fixture.nativeElement.querySelector('#current-password');
    setFieldValue(fixture, currentPasswordField, 'abc123');

    const newPasswordField = fixture.nativeElement.querySelector('#password');
    setFieldValue(fixture, newPasswordField, 'def456');

    const confirmPasswordField = fixture.nativeElement.querySelector('#confirm-password');
    setFieldValue(fixture, confirmPasswordField, 'def456');

    mockStore.next({
      user: {
        id: 4,
        username: 'joe',
        firstName: 'Joe',
        lastName: 'Foo',
        email: 'joe@foo.com',
        admin: false
      },
      chat: {
        profile: {
          loading: false,
          error: false,
          authError: true
        }
      }
    });
    fixture.detectChanges();

    expect(currentPasswordField.value).toBe('');
    expect(newPasswordField.value).toBe('');
    expect(confirmPasswordField.value).toBe('');

    expect(fixture.nativeElement.querySelector('.status-message-error')).not.toBeNull();
  });

  it('should show an error message when there is an error', () => {
    mockStore.next({
      user: {
        id: 4,
        username: 'joe',
        firstName: 'Joe',
        lastName: 'Foo',
        email: 'joe@foo.com',
        admin: false
      },
      chat: {
        profile: {
          loading: false,
          error: true,
          authError: false
        }
      }
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.status-message-error')).not.toBeNull();
  });

  it('should navigate back to the chat view when the cancel button is clicked', () => {
    const cancelButton = fixture.nativeElement.querySelector('.cancel-button');
    cancelButton.click();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/chat']);
  });

  it('should dispatch a SaveProfile action when the save button is clicked', () => {
    spyOn(mockStore, 'dispatch');
    const saveButton = fixture.nativeElement.querySelector('.button-primary');
    saveButton.click();
    expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.any(SaveProfile));
  });

  it('should disable all buttons and show a spinner when the loading flag is set', () => {
    mockStore.next({
      user: {
        id: 4,
        username: 'joe',
        firstName: 'Joe',
        lastName: 'Foo',
        email: 'joe@foo.com',
        admin: false
      },
      chat: {
        profile: {
          loading: true,
          error: false,
          authError: false
        }
      }
    });
    fixture.detectChanges();

    const cancelButton = fixture.nativeElement.querySelector('.cancel-button');
    expect(cancelButton.disabled).toBe(true);

    const saveButton = fixture.nativeElement.querySelector('.button-primary');
    expect(saveButton.disabled).toBe(true);

    const spinner = saveButton.querySelector('app-spinner');
    expect(spinner).not.toBeNull();
  });
});
