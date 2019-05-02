import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PreloaderModule } from 'app/modules/preloader/preloader.module';
import { PlayerComponent } from './components/player/player.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import { HoursMinutesSecondsPipe } from './pipes/hours-minutes-seconds.pipe';
import { PercentsIntoTimePipe } from './pipes/percents-into-time.pipe';

const components = [
  PlayerComponent,
  ThumbnailComponent,
  TrackListComponent
];

const pipes = [
  HoursMinutesSecondsPipe,
  PercentsIntoTimePipe
];

@NgModule({
  declarations: [
    ...components,
    ...pipes
  ],
  exports: [
    ...components,
    ...pipes
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PreloaderModule // for player
  ]
})
export class SharedModule { }
