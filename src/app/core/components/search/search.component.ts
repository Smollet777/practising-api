import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchField = new FormControl();

  private readonly unsubscribe$ = new Subject<void>();

  constructor(private readonly searchService: SearchService) { }

  ngOnInit(): void {
    this.searchField
      .valueChanges
      .pipe(
        map(term => term.trim()),
        debounceTime(700),
        filter(term => term),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(term => {
        this.searchService.query = term;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
