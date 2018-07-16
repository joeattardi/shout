import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { setFieldValue } from '../../../../testing/test-helpers';

import { UserListComponent } from './user-list.component';

const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Admin UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: Router, useValue: mockRouter }]
    });

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;

    component.users = [
      {
        id: 1,
        admin: false,
        firstName: 'Joe',
        lastName: 'Smith',
        username: 'joesmith'
      },
      {
        id: 2,
        admin: true,
        firstName: 'Henry',
        lastName: 'Jones',
        username: 'indy'
      }
    ];

    component.currentUser = {
      id: 2,
      admin: true,
      firstName: 'Henry',
      lastName: 'Jones',
      username: 'indy'
    };
    fixture.detectChanges();
  });

  it('should show a spinner only if the user list is loading', () => {
    component.loading = true;
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('app-spinner');
    expect(spinner).toBeDefined();

    const error = fixture.nativeElement.querySelector('.status-message-error');
    expect(error).toBeNull();

    const userList = fixture.nativeElement.querySelector('#user-list');
    expect(userList).toBeNull();
  });

  it('should show the error message only if there is an error', () => {
    component.error = true;
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('app-spinner');
    expect(spinner).toBeNull();

    const error = fixture.nativeElement.querySelector('.status-message-error');
    expect(error).toBeDefined();

    const userList = fixture.nativeElement.querySelector('#user-list');
    expect(userList).toBeNull();
  });

  it('should emit an event when the retry button is clicked', () => {
    component.error = true;
    fixture.detectChanges();

    const spy = jasmine.createSpy('retrySpy');
    component.retry.subscribe(() => {
      spy();
    });

    const retryButton = fixture.nativeElement.querySelector('#users-retry-button');
    retryButton.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit an event when a search term is entered', () => {
    const spy = jasmine.createSpy('searchSpy');
    component.searchUsers.subscribe((searchTerm: string) => {
      spy(searchTerm);
    });

    const searchInput = fixture.nativeElement.querySelector('#user-search input');
    setFieldValue(fixture, searchInput, 'foo');

    expect(spy).toHaveBeenCalledWith('foo');
  });

  it('should show the user list only if it is not loading and there is not an error', () => {
    component.error = false;
    component.loading = false;
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('app-spinner');
    expect(spinner).toBeNull();

    const error = fixture.nativeElement.querySelector('.status-message-error');
    expect(error).toBeNull();

    const userList = fixture.nativeElement.querySelector('#user-list');
    expect(userList).toBeDefined();
  });

  it('should render the user list', () => {
    const userEntries = fixture.nativeElement.querySelectorAll('#user-list .user-entry');

    for (let i = 0; i < component.users.length; i++) {
      const userEntry = userEntries[i];
      const user = component.users[i];

      const fullNameEl = userEntry.querySelector('.user-details .user-full-name');
      expect(fullNameEl.textContent.trim()).toEqual(`${user.firstName} ${user.lastName}`);
      const adminIcon = userEntry.querySelector('.user-details .user-full-name fa-icon');
      if (user.admin) {
        expect(adminIcon).toBeDefined();
      } else {
        expect(adminIcon).toBeNull();
      }

      const usernameEl = userEntry.querySelector('.user-details .user-username');
      expect(usernameEl.textContent.trim()).toEqual(user.username);

      const deleteButton = userEntry.querySelector('.delete-button');
      if (user.id === component.currentUser.id) {
        expect(deleteButton).toBeNull();
      } else {
        expect(deleteButton).toBeDefined();
      }
    }
  });

  it('should navigate to the edut user route when clicking on a user', () => {
    const userEntry = fixture.nativeElement.querySelector('#user-list .user-entry');
    userEntry.click();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin', 'users', 1]);
  });

  it('should emit an event when a delete button is clicked', () => {
    const spy = jasmine.createSpy('deleteSpy');
    component.delete.subscribe(user => {
      spy(user);
    });

    const deleteButton = fixture.nativeElement.querySelector('#user-list .user-entry .delete-button');
    deleteButton.click();
    expect(spy).toHaveBeenCalledWith(component.users[0]);
  });
});
