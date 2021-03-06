import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import jdenticon from 'jdenticon';

@Directive({ selector: '[appIdenticon]' })
export class IdenticonDirective implements OnChanges {
  @Input() appIdenticon: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    jdenticon.update(this.el.nativeElement, this.appIdenticon);
  }
}
