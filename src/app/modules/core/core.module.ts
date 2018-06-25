import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, HttpClientModule]
})
export class CoreModule {}
