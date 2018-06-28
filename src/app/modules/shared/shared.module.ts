import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdenticonDirective } from './identicon/identicon.directive';
import { ModalComponent } from './modal/modal.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [IdenticonDirective, ModalComponent, SpinnerComponent],
  exports: [IdenticonDirective, ModalComponent, SpinnerComponent]
})
export class SharedModule {}
