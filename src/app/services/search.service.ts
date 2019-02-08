import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { DummyDataService } from './dummy-data.service';
import { SearchResult } from './../models/searchResult';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl = environment.baseUrl;
  private dataSource = new BehaviorSubject<SearchResult>(this.dummy.searchResults);
  data = this.dataSource.asObservable();

  constructor(private http: HttpClient, private dummy: DummyDataService) { }

  updateData(data: SearchResult) {
    this.dataSource.next(data);
  }

  search(term: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(`${this.baseUrl}/search?q=${term}`);
  }
}
