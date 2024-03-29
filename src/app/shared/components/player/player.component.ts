import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { PlayerService } from '@core/services/player.service';
import { PreloaderService } from 'app/modules/preloader/preloader.service';
import { Track } from '../../interfaces/track';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit, OnDestroy {

  track: Track;

  // controls visualisation
  paused$ = this.playerService.paused$;
  isFirst: boolean;
  isLast: boolean;

  audio: HTMLAudioElement;

  progressbar = new UntypedFormControl();

  private _isRandom = false;
  private _isAutoplay = true;
  private readonly autoplayDelay = 1000;

  private readonly destroyedSubject = new Subject<void>();

  get isRandom(): boolean {
    return this._isRandom;
  }

  get isAutoplay(): boolean {
    return this._isAutoplay;
  }

  constructor(
    private readonly preloaderService: PreloaderService,
    private readonly playerService: PlayerService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.playerService
      .currentTrack$
      .pipe(
        tap(_ => this.preloaderService.show('player')),
        takeUntil(this.destroyedSubject)
      )
      .subscribe(track => {
        this.cleanupAudio();

        this.setControls();

        this.track = track;
        this.changeDetectorRef.markForCheck();

        const audio = new Audio();
        audio.preload = 'metadata';
        audio.src = track.preview;

        this.attachAudioListeners(audio);
      });
  }

  private attachAudioListeners(audio): void {
    audio.addEventListener(
      'loadedmetadata',
      _ => this.onAudioLoadedMetadata(audio)
    );

    audio.addEventListener(
      'timeupdate',
      this.onAudioTimeUpdate
    );

    audio.addEventListener(
      'ended',
      this.onAudioEnded
    );
  }

  private readonly onAudioLoadedMetadata = (audio: HTMLAudioElement) => {
    this.audio = audio;
    this.changeDetectorRef.markForCheck();

    this.playPause();

    this.preloaderService.hide('player');
  };

  private readonly onAudioTimeUpdate = () => {
    this.changeDetectorRef.markForCheck();
    this.progressbar.setValue(
      this.getPercentageProgress()
    );
  };

  private readonly onAudioEnded = () => {
    this.changeDetectorRef.markForCheck();
    if (this.isAutoplay && !this.playerService.paused) {
      setTimeout(() => this.nextTrack(), this.autoplayDelay);
    }
    this.playerService.paused = this.audio.paused;
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
    } else {
      this.audio.play();
    }
    this.playerService.paused = this.audio.paused;
  }

  prevTrack(): void {
    if (this.isRandom) {
      this.playerService.randomTrack();
      this.resetControls();
    } else {
      this.playerService.prevTrack();
      this.setControls();
    }
  }

  nextTrack(): void {
    if (this.isRandom) {
      this.playerService.randomTrack();
      this.resetControls();
    } else {
      this.playerService.nextTrack();
      this.setControls();
    }
  }

  toggleIsRandom(): void {
    this._isRandom = !this._isRandom;
    this._isRandom ?
      this.resetControls() :
      this.setControls();
  }

  toggleIsAutoplay(): void {
    this._isAutoplay = !this._isAutoplay;
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

    this.audio.pause();
    this.playerService.paused = this.audio.paused;
    this.audio.src = '';
    this.audio = null;
  }

  private setControls(): void {
    this.isFirst = this.playerService.currentTrackIndex() === 0;
    this.isLast = this.playerService.currentTrackIndex() === this.playerService.queue.length - 1;
  }

  private resetControls(): void {
    this.isFirst = false;
    this.isLast = false;
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();

    this.cleanupAudio();
  }
}
