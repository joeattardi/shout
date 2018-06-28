import { trigger, style, transition, animate } from '@angular/animations';
import { Component, HostBinding, Input } from '@angular/core';

import * as Color from 'color';

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

  @Input() size = '3em';

  @Input() borderWidth = '0.5em';

  @Input() color = '#FFFFFF';

  @HostBinding('@fade')
  get fade(): boolean {
    return true;
  }

  get backgroundColor(): string {
    const color = Color(this.color).alpha(0.2);
    return `rgba(${color.red()}, ${color.green()}, ${color.blue()}, ${color.alpha()})`;
  }
}
