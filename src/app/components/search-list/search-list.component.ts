import { DummyDataService } from './../../services/dummy-data.service';
import { Component, OnInit } from '@angular/core';

import { SearchResult } from 'src/app/models/searchResult';
import { SearchService } from 'src/app/services/search.service';
import { Track } from 'src/app/interfaces/track';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  searchResult = this.ds.searchResults;

  constructor(private searchService: SearchService, private ds: DummyDataService) { }

  ngOnInit() {
    this.searchService.query$.subscribe(term => {
      this.searchService.search(term)
        .subscribe((result: SearchResult<Track>) => {
          this.searchResult = result;
        });
    });
  }

}
