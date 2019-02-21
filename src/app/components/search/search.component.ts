import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, takeUntil, filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchField = new FormControl();

  private destroyedSubject = new Subject<void>();

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchField
      .valueChanges
      .pipe(
        map(term => term.trim()),
        filter(term => term),
        debounceTime(700),
        distinctUntilChanged(),
        takeUntil(this.destroyedSubject)
      )
      .subscribe(term => {
        this.searchService.query = term;
      });
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
