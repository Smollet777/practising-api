import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { SearchListService } from '@core/http/search-list.service';
import { SearchService } from '@core/services/search.service';

import { Track } from '@shared/interfaces/track';
import { SearchResult } from '@shared/models/search-result';

@Component({
  selector: 'app-popper',
  templateUrl: './popper.component.html',
  styleUrls: ['./popper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopperComponent implements OnInit {

  searchResult$ = new Observable<SearchResult<Track>>();
  index = 0;
  limit = 5;

  term: string;

  constructor(
    private readonly searchService: SearchService,
    private readonly searchListService: SearchListService) { }

  ngOnInit(): void {
    this.searchResult$ = this.searchService.query$.pipe(
      tap(term => this.term = term),
      switchMap(term => this.searchListService
        .search(term, this.index, this.limit))
    );
  }

  trackByFn(index, item): string {
    return item.id;
  }
}
