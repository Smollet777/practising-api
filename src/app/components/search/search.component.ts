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
  searchResult = new SearchResult();

  constructor(private service: SearchService) { }

  ngOnInit() {
  }

  search(event: Event) {
    event.preventDefault();
    this.service.search(this.Search.query).subscribe((result: SearchResult) => {
      this.searchResult = result;
    }, error => this.error);
  }


}
