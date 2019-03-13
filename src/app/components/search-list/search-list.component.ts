import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

import { Track } from '../../interfaces/track';
import { SearchResult } from '../../models/search-result';
import { SearchService } from '../../services/search.service';
import { PlayerService } from './../../services/player.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  searchResult$: Observable<SearchResult<Track>>;

  constructor(
    private readonly searchService: SearchService,
    private readonly playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.searchResult$ = this.searchService.query$.pipe(
      startWith('blackpink'),
      switchMap((term: string) => this.searchService.search(term)),
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
