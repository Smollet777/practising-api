import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

import { SearchListService } from '../../../../core/http/search-list.service';
import { PlayerService } from '../../../../core/services/player.service';
import { SearchService } from '../../../../core/services/search.service';

import { Track } from '../../../../shared/interfaces/track';
import { SearchResult } from '../../../../shared/models/search-result';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  searchResult$: Observable<SearchResult<Track>>;

  constructor(
    private readonly searchService: SearchService,
    private readonly searchListService: SearchListService,
    private readonly playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.searchResult$ = this.searchService.query$.pipe(
      startWith('blackpink'),
      switchMap((term: string) => this.searchListService.search(term)),
      tap((result: SearchResult<Track>) => this.playerService.queue = result.data)
    );
  }

  trackByFn(index, item): string {
    return item.id;
  }

  play(track: Track): void {
    this.playerService.currentTrack = track;
  }
}
