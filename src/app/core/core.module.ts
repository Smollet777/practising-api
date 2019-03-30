import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const components = [
  HeaderComponent,
  MainLayoutComponent,
  SearchComponent
];

@NgModule({
  declarations: components,
  exports: [
    components
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    CommonModule
  ]
})
export class CoreModule { }
