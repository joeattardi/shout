import { trigger, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Output, HostBinding, HostListener } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))])
    ])
  ]
})
export class ModalComponent {
  icons = {
    close: faTimes
  };

  @Output() close = new EventEmitter<void>();

  @HostBinding('@fade')
  get fade(): boolean {
    return true;
  }

  @HostListener('keydown.escape')
  escapePressed() {
    this.close.emit();
  }

  closeButtonClicked() {
    this.close.emit();
  }
}
