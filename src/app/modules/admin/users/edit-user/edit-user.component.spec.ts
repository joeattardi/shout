import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { EditUserComponent } from './edit-user.component';

import { MockStore } from '../../../../testing/store.mock';
import { checkRequired, setFieldValue } from '../../../../testing/test-helpers';

import { AdminService } from '../../admin.service';
import { DeleteUser } from '../../actions';

const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

const mockAdminService = jasmine.createSpyObj('AdminService', ['checkUsernameTaken']);

describe('Admin EditUserComponent', () => {
  describe('edit mode and common scenarios', () => {
    let fixture: ComponentFixture<EditUserComponent>;
    let mockStore: MockStore<any>;

    beforeEach(() => {
      mockStore = new MockStore({
        admin: {
          users: {
            edit: {
              user: {
                firstName: 'Joe',
                lastName: 'Foo',
                username: 'joe',
                email: 'joe@foo.com',
                admin: true
              },
              loading: false,
              error: false
            }
          }
        }
      });

      const mockRoute = {
        snapshot: {
          params: {
            id: 1
          }
        }
      };

      TestBed.configureTestingModule({
        declarations: [EditUserComponent],
        imports: [ReactiveFormsModule, NoopAnimationsModule],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          {
            provide: Store,
            useValue: mockStore
          },
          {
            provide: ActivatedRoute,
            useValue: mockRoute
          },
          {
            provide: Router,
            useValue: mockRouter
          },
          {
            provide: AdminService,
            useValue: mockAdminService
          }
        ]
      });

      fixture = TestBed.createComponent(EditUserComponent);
      fixture.detectChanges();
    });

    it('should initialize the form with the user data', () => {
      const firstNameField = fixture.nativeElement.querySelector('#first-name');
      expect(firstNameField.value).toBe('Joe');

      const lastNameField = fixture.nativeElement.querySelector('#last-name');
      expect(lastNameField.value).toBe('Foo');

      const usernameField = fixture.nativeElement.querySelector('#username');
      expect(usernameField.value).toBe('joe');

      const emailField = fixture.nativeElement.querySelector('#email');
      expect(emailField.value).toBe('joe@foo.com');

      const adminCheckbox = fixture.nativeElement.querySelector('#admin');
      expect(adminCheckbox.checked).toBe(true);
    });

    it(
      'should mark the username field as invalid if the username is already taken and valid if it is available',
      fakeAsync(() => {
        mockAdminService.checkUsernameTaken.and.returnValue(of({ result: 'taken' }));
        const usernameField = fixture.nativeElement.querySelector('#username');
        setFieldValue(fixture, usernameField, 'foo');
        tick(500);
        fixture.detectChanges();
        expect(usernameField.classList).toContain('ng-invalid');

        mockAdminService.checkUsernameTaken.and.returnValue(of({ result: 'available' }));
        setFieldValue(fixture, usernameField, 'bar');
        tick(500);
        fixture.detectChanges();
        expect(usernameField.classList).toContain('ng-valid');
      })
    );

    it('should require the confirm password field if a password is set', () => {
      const confirmPasswordField = fixture.nativeElement.querySelector('#confirm-password');
      expect(confirmPasswordField.classList).toContain('ng-valid');

      const passwordField = fixture.nativeElement.querySelector('#password');
      setFieldValue(fixture, passwordField, 'abc123');
      expect(confirmPasswordField.classList).toContain('ng-invalid');

      setFieldValue(fixture, confirmPasswordField, 'abc123');
      expect(confirmPasswordField.classList).toContain('ng-valid');
    });

    it('should mark the confirm password field as invalid if the passwords do not match', () => {
      const passwordField = fixture.nativeElement.querySelector('#password');
      setFieldValue(fixture, passwordField, 'abc123');

      const confirmPasswordField = fixture.nativeElement.querySelector('#confirm-password');
      setFieldValue(fixture, confirmPasswordField, 'def456');
      expect(confirmPasswordField.classList).toContain('error');
    });

    it('should show the delete button', () => {
      expect(fixture.nativeElement.querySelector('.delete-button-container button')).not.toBeNull();
    });

    it('should show the title as "Edit User"', () => {
      const modalTitle = fixture.nativeElement.querySelector('.modal-title');
      expect(modalTitle.textContent.trim()).toBe('Edit User');
    });

    it('should dispatch a DeleteUser action when the delete button is clicked', () => {
      spyOn(mockStore, 'dispatch');
      const deleteButton = fixture.nativeElement.querySelector('.delete-button-container button');
      deleteButton.click();
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        new DeleteUser({
          firstName: 'Joe',
          lastName: 'Foo',
          username: 'joe',
          email: 'joe@foo.com',
          admin: true
        })
      );
    });

    describe('required fields', () => {
      it('should require the first name', () => {
        checkRequired(fixture, '#first-name');
      });

      it('should require the last name', () => {
        checkRequired(fixture, '#last-name');
      });

      it('should require the email', () => {
        checkRequired(fixture, '#email', 'foo@foo.com');
      });

      it(
        'should require an available username',
        fakeAsync(() => {
          mockAdminService.checkUsernameTaken.and.returnValue(of({ result: 'available' }));
          const usernameField = fixture.nativeElement.querySelector('#username');
          setFieldValue(fixture, usernameField, '');
          tick(500);
          fixture.detectChanges();
          expect(usernameField.classList).toContain('ng-invalid');
          expect(usernameField.classList).toContain('error');

          setFieldValue(fixture, usernameField, 'foo');
          tick(500);
          fixture.detectChanges();
          expect(usernameField.classList).toContain('ng-valid');
          expect(usernameField.classList).not.toContain('error');
        })
      );

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
    });

    it('should navigate back to the user list when the cancel button is clicked', () => {
      const cancelButton = fixture.nativeElement.querySelector('.cancel-button');
      cancelButton.click();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin', 'users']);
    });

    it('should show a spinner and disable the buttons when the loading flag is set', () => {
      mockStore.next({
        admin: {
          users: {
            edit: {
              user: {
                firstName: 'Joe',
                lastName: 'Foo',
                username: 'joe',
                email: 'joe@foo.com',
                admin: true
              },
              loading: true,
              error: false
            }
          }
        }
      });
      fixture.detectChanges();

      const deleteButton = fixture.nativeElement.querySelector('.delete-button-container button');
      expect(deleteButton.disabled).toBe(true);

      const cancelButton = fixture.nativeElement.querySelector('.cancel-button');
      expect(cancelButton.disabled).toBe(true);

      const saveButton = fixture.nativeElement.querySelector('.button-primary');
      expect(saveButton.disabled).toBe(true);

      const spinner = saveButton.querySelector('app-spinner');
      expect(spinner).not.toBeNull();
    });

    it('should show an error message when the error flag is set', () => {
      mockStore.next({
        admin: {
          users: {
            edit: {
              user: {
                firstName: 'Joe',
                lastName: 'Foo',
                username: 'joe',
                email: 'joe@foo.com',
                admin: true
              },
              loading: false,
              error: true
            }
          }
        }
      });
      fixture.detectChanges();

      const errorMessage = fixture.nativeElement.querySelector('.status-message-error');
      expect(errorMessage).not.toBeNull();
    });
  });

  describe('create mode', () => {
    let fixture: ComponentFixture<EditUserComponent>;
    let mockStore: MockStore<any>;

    beforeEach(() => {
      mockStore = new MockStore({
        admin: {
          users: {
            edit: {
              user: {},
              loading: false,
              error: false
            }
          }
        }
      });

      const mockRoute = {
        snapshot: {
          params: {
            id: 'new'
          }
        }
      };

      TestBed.configureTestingModule({
        declarations: [EditUserComponent],
        imports: [ReactiveFormsModule, NoopAnimationsModule],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          {
            provide: Store,
            useValue: mockStore
          },
          {
            provide: ActivatedRoute,
            useValue: mockRoute
          },
          {
            provide: Router,
            useValue: mockRouter
          },
          {
            provide: AdminService,
            useValue: mockAdminService
          }
        ]
      });

      fixture = TestBed.createComponent(EditUserComponent);
      fixture.detectChanges();
    });

    it('should show the title as "Create User"', () => {
      const modalTitle = fixture.nativeElement.querySelector('.modal-title');
      expect(modalTitle.textContent.trim()).toBe('Create User');
    });

    it('should not show the delete button', () => {
      expect(fixture.nativeElement.querySelector('.delete-button-container button')).toBeNull();
    });

    it('should require a password', () => {
      checkRequired(fixture, '#password');
    });
  });
});
