import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { SearchListComponent } from './pages/search-list/search-list.component';

@NgModule({
  declarations: [
    SearchListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainRoutingModule,
    InfiniteScrollModule,
    SharedModule
  ]
})
export class MainModule { }
