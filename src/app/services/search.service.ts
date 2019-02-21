import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { SearchResult } from './../models/searchResult';
import { Track } from '../interfaces/track';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _query: string;
  private querySubject = new Subject<string>();
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  set query(query: string) {
    this._query = query;
    this.querySubject.next(query);
  }

  get query(): string {
    return this._query;
  }

  get query$(): Observable<string> {
    return this.querySubject.asObservable();
  }

  search(term: string): Observable<SearchResult<Track>> {
    return this.http.get<SearchResult<Track>>(`${this.baseUrl}/search?q=${term}&limit=12`);
  }
}
