import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { PopperComponent } from './components/popper/popper.component';
import { SearchComponent } from './components/search/search.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';

import { PreloaderModule } from 'app/modules/preloader/preloader.module';
import { HttpRetryModule } from './../modules/http-retry/http-retry.module';
import { HttpPreloaderInterceptor } from './interceptors/http-preloader-interceptor';
import { HttpRetryInterceptor } from './interceptors/http-retry-interceptor';

const components = [
  HeaderComponent,
  MainLayoutComponent,
  SearchComponent,
  PageNotFoundComponent,
  PopperComponent
];

@NgModule({
  declarations: components,
  entryComponents: [PopperComponent],
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
    HttpRetryModule,
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpPreloaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRetryInterceptor, multi: true }
  ]
})
export class CoreModule { }
