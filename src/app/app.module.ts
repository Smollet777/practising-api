import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlayerComponent } from './components/player/player.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { SearchComponent } from './components/search/search.component';
import { HoursMinutesSecondsPipe } from './pipes/hours-minutes-seconds.pipe';
import { PercentsIntoTimePipe } from './pipes/percents-into-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SearchComponent,
    SearchListComponent,
    HoursMinutesSecondsPipe,
    PlayerComponent,
    PercentsIntoTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
