import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PreloaderComponent } from './preloader/preloader.component';

const components = [
  PreloaderComponent
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule
  ]
})
export class PreloaderModule { }
