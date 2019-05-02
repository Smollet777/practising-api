import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { PlayerService } from '@core/services/player.service';
import { Track } from '@shared/interfaces/track';
import { SearchResult } from '@shared/models/search-result';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit, OnDestroy {

  private readonly _data = new BehaviorSubject<SearchResult<Track>>(new SearchResult());
  @Input()
  set result(value) {
    this._data.next(value);
  }

  get result(): SearchResult<Track> {
    return this._data.getValue();
  }

  get result$(): Observable<SearchResult<Track>> {
    return this._data.asObservable();
  }

  private readonly destroyedSubject = new Subject<void>();

  currentTrack$ = this.playerService.currentTrack$;
  paused$ = this.playerService.paused$;
  hovered = false;

  constructor(
    private readonly playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.result$
      .pipe(
        takeUntil(this.destroyedSubject)
      )
      .subscribe(value => this.playerService.queue = value.data); // player queue

    this.playIconToggle();
  }

  private playIconToggle(): void {
    this.currentTrack$.pipe(
      tap(track => {
        const data = this.result.data;
        data.forEach(element =>
          element.id === track.id ?
            element.isPlaying = true :
            delete element.isPlaying
        );
      }),
      takeUntil(this.destroyedSubject))
      .subscribe();
  }

  trackByFn(_, item: Track): number {
    return item.id;
  }

  play(track: Track): void {
    this.playerService.currentTrack = track;
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }
}
