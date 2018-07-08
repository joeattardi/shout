import { ComponentFixture } from '@angular/core/testing';

export function checkRequired(fixture: ComponentFixture<any>, fieldSelector: string, value = 'foo') {
  const field = fixture.nativeElement.querySelector(fieldSelector);
  setFieldValue(fixture, field, '');
  expect(field.classList).toContain('ng-invalid');
  expect(field.classList).toContain('error');

  setFieldValue(fixture, field, value);
  expect(field.classList).toContain('ng-valid');
  expect(field.classList).not.toContain('error');
}

export function setFieldValue(fixture: ComponentFixture<any>, field: HTMLInputElement, value: string, blur = true) {
  field.value = value;
  field.dispatchEvent(new Event('input'));
  if (blur) {
    field.dispatchEvent(new Event('blur'));
  }
  fixture.detectChanges();
}
