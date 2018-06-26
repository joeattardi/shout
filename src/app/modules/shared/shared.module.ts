import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdenticonDirective } from './identicon/identicon.directive';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [IdenticonDirective, SpinnerComponent],
  exports: [IdenticonDirective, SpinnerComponent]
})
export class SharedModule {}
