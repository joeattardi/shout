import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { HeaderComponent } from './header.component';

import { MockStore } from '../../../testing/store.mock';

const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Chat HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let mockStore: MockStore<any>;

  beforeEach(() => {
    mockStore = new MockStore({
      user: {
        firstName: 'Joe',
        lastName: 'Foo',
        username: 'joe',
        admin: false
      },
      chat: {
        userMenuOpen: false
      }
    });

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: Store,
          useValue: mockStore
        }
      ]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('should show the users first and last name in the header', () => {
    const usernameEl = fixture.nativeElement.querySelector('#user-container #user-name');
    expect(usernameEl.textContent.trim()).toBe('Joe Foo');
  });

  it('should show the users first name, last name, and username in the user menu', () => {
    const userMenu = fixture.nativeElement.querySelector('.popup-menu');
    const userFullNameEl = userMenu.querySelector('#user-full-name');
    expect(userFullNameEl.textContent.trim()).toBe('Joe Foo');

    const usernameEl = userMenu.querySelector('#user-username');
    expect(usernameEl.textContent.trim()).toBe('joe');
  });

  it('should not show the admin link if the user is not an admin', () => {
    const adminContainer = fixture.nativeElement.querySelector('#admin-container');
    expect(adminContainer).toBeNull();
  });

  it('should show the admin link if the user is an admin', () => {
    mockStore.next({
      user: {
        firstName: 'Joe',
        lastName: 'Foo',
        username: 'joe',
        admin: true
      },
      chat: {
        userMenuOpen: false
      }
    });
    fixture.detectChanges();

    const adminContainer = fixture.nativeElement.querySelector('#admin-container');
    expect(adminContainer).not.toBeNull();
  });

  it('should not apply the open class to the chevron icon if the user menu is closed', () => {
    const chevron = fixture.nativeElement.querySelector('#user-container fa-icon');
    expect(chevron.classList).not.toContain('open');
  });

  it('should apply the open class to the chevron icon if the user menu is open', () => {
    mockStore.next({
      user: {
        firstName: 'Joe',
        lastName: 'Foo',
        username: 'joe',
        admin: false
      },
      chat: {
        userMenuOpen: true
      }
    });
    fixture.detectChanges();

    const chevron = fixture.nativeElement.querySelector('#user-container fa-icon');
    expect(chevron.classList).toContain('open');
  });
});
