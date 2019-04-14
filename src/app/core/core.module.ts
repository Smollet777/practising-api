import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';

import { PreloaderModule } from 'app/modules/preloader/preloader.module';
import { HttpPreloaderInterceptor } from './interceptors/http-preloader-interceptor';

const components = [
  HeaderComponent,
  MainLayoutComponent,
  SearchComponent,
  PageNotFoundComponent
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
    PreloaderModule, // for http
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpPreloaderInterceptor, multi: true }
  ]
})
export class CoreModule { }
