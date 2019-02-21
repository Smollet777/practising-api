import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';

import { SearchService } from '../../services/search.service';
import { SearchResult } from '../../models/searchResult';
import { Track } from '../../interfaces/track';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  searchResult$: Observable<SearchResult<Track>>;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchResult$ = this.searchService.query$.pipe(
      startWith('blackpink'),
      switchMap((term: string) => this.searchService.search(term))
    );
  }
}

