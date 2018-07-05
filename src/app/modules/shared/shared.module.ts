import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdenticonDirective } from './identicon/identicon.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ModalComponent } from './modal/modal.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [ConfirmModalComponent, IdenticonDirective, ModalComponent, SpinnerComponent],
  exports: [ConfirmModalComponent, IdenticonDirective, ModalComponent, SpinnerComponent]
})
export class SharedModule {}
