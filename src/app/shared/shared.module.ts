import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PreloaderModule } from 'app/modules/preloader/preloader.module';
import { PlayerComponent } from './components/player/player.component';
import { HoursMinutesSecondsPipe } from './pipes/hours-minutes-seconds.pipe';
import { PercentsIntoTimePipe } from './pipes/percents-into-time.pipe';
import { SnakeCasePipe } from './pipes/snake-case.pipe';

const components = [
  PlayerComponent
];

const pipes = [
  HoursMinutesSecondsPipe,
  PercentsIntoTimePipe,
  SnakeCasePipe
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
    PreloaderModule // for player
  ]
})
export class SharedModule { }
