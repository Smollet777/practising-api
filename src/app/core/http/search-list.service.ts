import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Track } from '@shared/interfaces/track';
import { SearchResult } from '@shared/models/search-result';

@Injectable({
  providedIn: 'root'
})
export class SearchListService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) { }

  search(term: string, index = 0, limit = 25): Observable<SearchResult<Track>> {
    return this.http.get<SearchResult<Track>>(`${this.baseUrl}/search?q=${term}&index=${index}&limit=${limit}`);
  }
}
