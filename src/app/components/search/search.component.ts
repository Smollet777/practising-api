import { Component, OnInit } from '@angular/core';

import { SearchService } from 'src/app/services/search.service';
import { SearchResult } from 'src/app/models/searchResult';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  error = '';
  Search = { query: '' };

  constructor(private service: SearchService) { }

  ngOnInit() {
  }

  search(event: Event) {
    event.preventDefault();
    this.service.search(this.Search.query).subscribe((result: SearchResult) => {
      this.service.updateData(result);
      this.Search.query = '';
    }, error => this.error);
  }


}
