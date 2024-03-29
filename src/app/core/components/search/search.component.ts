import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchField = new UntypedFormControl();

  private readonly destroyedSubject = new Subject<void>();

  constructor(private readonly searchService: SearchService) { }

  ngOnInit(): void {
    this.searchField
      .valueChanges
      .pipe(
        map(term => term.trim()),
        debounceTime(700),
        filter(term => term),
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
