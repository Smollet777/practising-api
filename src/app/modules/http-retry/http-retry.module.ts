import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpRetryComponent } from './http-retry/http-retry.component';

const components = [
  HttpRetryComponent
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule
  ]
})
export class HttpRetryModule { }
