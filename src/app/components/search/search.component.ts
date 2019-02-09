import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SearchService } from 'src/app/services/search.service';
import { SearchResult } from 'src/app/models/searchResult';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchField = new FormControl();

  private destroyedSubject = new Subject<void>();

  constructor(private service: SearchService) { }

  ngOnInit() {
    this.searchField
      .valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(700),
        takeUntil(this.destroyedSubject)
      )
      .subscribe((term: string) =>
        this.service.search(term).subscribe((result: SearchResult) => {
          this.service.updateData(result);
        })
      );
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
