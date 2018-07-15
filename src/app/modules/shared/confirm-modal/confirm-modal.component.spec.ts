import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let fixture: ComponentFixture<ConfirmModalComponent>;
  let component: ConfirmModalComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmModalComponent],
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ConfirmModalComponent);
    fixture.detectChanges();

    component = fixture.componentInstance;
  });

  it('should emit the confirm event when the confirm button is clicked', () => {
    const spy = jasmine.createSpy();
    component.confirm.subscribe(() => spy());

    const confirmButton = fixture.nativeElement.querySelector('.modal-footer button:nth-child(2)');
    confirmButton.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit the cancel event when the cancel button is clicked', () => {
    const spy = jasmine.createSpy();
    component.cancel.subscribe(() => spy());

    const cancelButton = fixture.nativeElement.querySelector('.modal-footer button');
    cancelButton.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should set the modal title', () => {
    component.title = 'foo';
    fixture.detectChanges();

    const titleEl = fixture.nativeElement.querySelector('.modal-title');
    expect(titleEl.textContent.trim()).toBe('foo');
  });

  it('should set the button labels', () => {
    component.confirmButtonText = 'Foo';
    component.cancelButtonText = 'Bar';
    fixture.detectChanges();

    const confirmButton = fixture.nativeElement.querySelector('.modal-footer button:nth-child(2)');
    expect(confirmButton.textContent.trim()).toBe('Foo');

    const cancelButton = fixture.nativeElement.querySelector('.modal-footer button');
    expect(cancelButton.textContent.trim()).toBe('Bar');
  });

  it('should set the confirm button type', () => {
    component.confirmButtonType = 'button-primary-danger';
    fixture.detectChanges();

    const confirmButton = fixture.nativeElement.querySelector('.modal-footer button:nth-child(2)');
    expect(confirmButton.classList).toContain('button-primary-danger');
  });
});
