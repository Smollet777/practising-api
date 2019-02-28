import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';

import { Track } from '../interfaces/track';
import { SearchResult } from '../models/search-result';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _query: string;
  private readonly querySubject = new Subject<string>();
  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) { }

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
