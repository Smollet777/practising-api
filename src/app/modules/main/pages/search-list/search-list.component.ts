import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

import { SearchListService } from '@core/http/search-list.service';
import { PlayerService } from '@core/services/player.service';
import { SearchService } from '@core/services/search.service';

import { Track } from '@interfaces/track';
import { SearchResult } from '@shared/models/search-result';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, OnDestroy {

  private subscription$: Subscription;
  readonly searchResult$ = new BehaviorSubject<SearchResult<Track>>(new SearchResult());

  private readonly term$ = this.searchService.query$.pipe(startWith('blackpink'));
  private readonly index$ = this.searchService.index$;
  private readonly limit = this.searchService.chunkSize;

  constructor(
    private readonly searchService: SearchService,
    private readonly searchListService: SearchListService,
    private readonly playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.subscription$ = combineLatest(
      this.term$.pipe(
        tap(_ => this.searchResult$.next(new SearchResult()))
      ),
      this.index$
    )
      .pipe(
        switchMap(([term, index]) => this.searchListService
          .search(term, index, this.limit)),
        tap((result: SearchResult<Track>) => {
          const currentTracks = this.searchResult$.value.data;
          result.data.unshift(...currentTracks);
          this.searchResult$.next(result);
        }),
        tap(_ => this.playerService.queue = this.searchResult$.value.data)
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
    this.subscription$.unsubscribe();
  }
}
