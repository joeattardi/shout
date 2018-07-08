import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { NotificationTheme } from './notification.types';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
  });

  it('should show the specified notification', () => {
    component.notification = {
      theme: NotificationTheme.SUCCESS,
      message: 'Success!'
    };
    fixture.detectChanges();

    const notification = fixture.nativeElement.querySelector('.notification');
    expect(notification.classList).toContain('notification-success');

    const message = notification.querySelector('.message');
    expect(message.textContent.trim()).toBe('Success!');
  });

  it('should emit an event when the close button is clicked', () => {
    component.notification = {
      theme: NotificationTheme.SUCCESS,
      message: 'Success!'
    };
    fixture.detectChanges();

    const spy = jasmine.createSpy('removeSpy');
    component.remove.subscribe(() => {
      spy();
    });

    const closeButton = fixture.nativeElement.querySelector('.close fa-icon');
    closeButton.click();
    expect(spy).toHaveBeenCalled();
  });
});
