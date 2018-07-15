import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ModalComponent);
    fixture.detectChanges();
  });

  it('should emit the close event when the close button is clicked', () => {
    const spy = jasmine.createSpy();
    fixture.componentInstance.close.subscribe(() => {
      spy();
    });

    const closeButton = fixture.nativeElement.querySelector('.close-button');
    closeButton.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit the close event when the escape key is pressed', () => {
    const spy = jasmine.createSpy();
    fixture.componentInstance.close.subscribe(() => {
      spy();
    });

    fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'escape' }));
    expect(spy).toHaveBeenCalled();
  });
});
