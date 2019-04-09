import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { SearchResult } from '@shared/models/search-result';
import { Track } from '../../shared/interfaces/track';

@Injectable({
  providedIn: 'root'
})
export class SearchListService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) { }

  search(term: string): Observable<SearchResult<Track>> {
    return this.http.get<SearchResult<Track>>(`${this.baseUrl}/search?q=${term}&limit=12`);
  }
}