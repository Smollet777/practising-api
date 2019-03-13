import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Track } from '../../interfaces/track';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit, OnDestroy {

  track: Track;

  // controls visualisation
  isPlaying: boolean;
  isFirst: boolean;
  isLast: boolean;

  audio: HTMLAudioElement;

  private readonly destroyedSubject = new Subject<void>();

  constructor(
    private readonly playerService: PlayerService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.playerService
      .currentTrack$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(track => {
        this.cleanupAudio();

        this.setControls();

        this.track = track;
        this.changeDetectorRef.markForCheck();

        const audio = new Audio();
        audio.preload = 'metadata';
        audio.src = track.preview;

        audio.addEventListener(
          'loadedmetadata',
          () => {
            this.audio = audio;
            this.changeDetectorRef.markForCheck();

            this.playPause();
          }
        );

        audio.addEventListener(
          'timeupdate',
          () => {
            this.changeDetectorRef.markForCheck();
          }
        );

        audio.addEventListener(
          'ended',
          () => {
            this.changeDetectorRef.markForCheck();
            this.isPlaying = false;
          }
        );
      });
  }

  prevTrack(): void {
    this.playerService.prevTrack();
    this.setControls();
  }

  playPause(): void {
    if (!this.audio.paused) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      this.audio.play();
      this.isPlaying = true;
    }
  }

  nextTrack(): void {
    this.playerService.nextTrack();
    this.setControls();
  }

  getPercentageProgress(): number {
    return (100 / (this.audio.duration / this.audio.currentTime)) || Number(0);
  }

  private cleanupAudio(): void {
    if (!this.audio) {
      return;
    }

    this.isPlaying = false;
    this.audio.pause();
    this.audio.src = '';
    this.audio = null;
  }

  private setControls(): void {
    this.isFirst = this.playerService.currentTrackIndex() === 0;
    this.isLast = this.playerService.currentTrackIndex() === this.playerService.queue.length - 1;
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();

    this.cleanupAudio();
  }
}