import { trigger, style, transition, animate } from '@angular/animations';

import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))])
    ])
  ]
})
export class SpinnerComponent {
  @Input() overlay = false;

  @HostBinding('@fade')
  get fade() {
    return true;
  }
}
