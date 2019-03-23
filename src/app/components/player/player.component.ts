import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  progressbar = new FormControl();

  private _isRandom = false;
  private _isAutoplay = true;
  private readonly autoplayDelay = 1000;

  private readonly destroyedSubject = new Subject<void>();

  get isAutoplay(): boolean {
    return this._isAutoplay;
  }

  get isRandom(): boolean {
    return this._isRandom;
  }

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
          this.onAudioTimeUpdate
        );

        audio.addEventListener(
          'ended',
          () => {
            this.changeDetectorRef.markForCheck();
            this.isPlaying = false;
            if (this.isAutoplay) {
                setTimeout(() => this.nextTrack(), this.autoplayDelay);
            }
          }
        );
      });
  }

  onAudioTimeUpdate = () => {
    this.changeDetectorRef.markForCheck();
    this.progressbar.setValue(
      this.getPercentageProgress()
    );
  };

  onProgressbarInput(): void {
    this.audio.removeEventListener('timeupdate', this.onAudioTimeUpdate);
  }

  onProgressbarChange(): void {
    this.audio.currentTime = (this.progressbar.value / 100) * this.audio.duration;
    this.audio.addEventListener('timeupdate', this.onAudioTimeUpdate);
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

  prevTrack(): void {
    if (this.isRandom) {
      this.playerService.randomTrack();
    } else {
      this.playerService.prevTrack();
    }
    this.setControls();
  }

  nextTrack(): void {
    if (this.isRandom) {
      this.playerService.randomTrack();
    } else {
      this.playerService.nextTrack();
    }
    this.setControls();
  }

  toggleIsAutoplay(): void {
    this._isAutoplay = !this._isAutoplay;
  }

  toggleIsRandom(): void {
    this._isRandom = !this._isRandom;
  }

  private getPercentageProgress(): number {
    if (this.audio) {
      return Math.floor((100 / (this.audio.duration / this.audio.currentTime)));
    }

    return 0;
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
