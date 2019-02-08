import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { SearchService } from 'src/app/services/search.service';
import { SearchResult } from 'src/app/models/searchResult';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchField: FormControl;

  constructor(private service: SearchService) { }

  ngOnInit() {
    this.searchField = new FormControl();
    this.searchField.valueChanges.pipe(
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe((term: string) =>
      this.service.search(term).subscribe((result: SearchResult) => {
        this.service.updateData(result);
      })
    );
  }

}
