import { Component, OnInit } from '@angular/core';

import { SearchResult } from 'src/app/models/searchResult';
import { SearchService } from 'src/app/services/search.service';
import { Track } from '../../interfaces/track.interface';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  searchResult: SearchResult<Track>;

  constructor(private service: SearchService) { }

  ngOnInit() {
    this.service.data.subscribe((result: SearchResult) =>
      this.searchResult = result
    );
  }

}
