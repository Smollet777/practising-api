import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

import { SearchListService } from '@core/http/search-list.service';
import { PlayerService } from '@core/services/player.service';
import { SearchService } from '@core/services/search.service';

import { Track } from '@shared/interfaces/track';
import { SearchResult } from '@shared/models/search-result';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, OnDestroy {

  readonly searchResult$ = new BehaviorSubject<SearchResult<Track>>(new SearchResult());

  private readonly unsubscribe$ = new Subject<void>();

  private readonly term$ = this.searchService.query$;
  private readonly index$ = this.searchService.index$;
  private readonly limit = this.searchService.chunkSize;

  currentTrack$ = this.playerService.currentTrack$;
  paused$ = this.playerService.paused$;
  hovered = false;

  constructor(
    private readonly searchService: SearchService,
    private readonly searchListService: SearchListService,
    private readonly playerService: PlayerService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.playIconToggle();
    this.searchResultData();
  }

  private playIconToggle(): void {
    this.currentTrack$.pipe(
      tap(track => {
        const data = this.searchResult$.value.data;
        data.forEach(element =>
          element.id === track.id ?
            element.isPlaying = true :
            delete element.isPlaying
        );
      }),
      takeUntil(this.unsubscribe$))
      .subscribe();
  }

  private searchResultData(): void {

    combineLatest([
      this.route.paramMap,
      this.index$
    ])
      .pipe(
        switchMap(([param, index]) => this.searchListService
          .search(param.get('term'), index, this.limit)),
        tap((result: SearchResult<Track>) => {
          // unshift loaded data to current tracklist
          const currentTracks = this.searchResult$.value.data;
          result.data.unshift(...currentTracks);
          this.searchResult$.next(result);
        }),
        tap(_ => this.playerService.queue = this.searchResult$.value.data), // player queue
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  trackByFn(index, item): string {
    return item.id;
  }

  play(track: Track): void {
    this.playerService.currentTrack = track;
  }

  nextChunk(): void {
    if (this.searchResult$.value.next) {
      this.searchService.nextChunk();
    }
  }

  prevChunk(): void {
    this.searchService.prevChunk();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
