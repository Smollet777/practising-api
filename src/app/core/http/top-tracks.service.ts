import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Track } from '@shared/interfaces/track';
import { SearchResult } from '@shared/models/search-result';

@Injectable({
  providedIn: 'root'
})
export class TopTracksService {

  private readonly baseUrl = environment.baseUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  getTopTracks(id: number, limit = 0): Observable<SearchResult<Track>> {
    const query = `artist/${id}/top${limit ? `?limit=${limit}` : ''}`;

    return this.http.get<SearchResult<Track>>(`${this.baseUrl}/${query}`);
  }
}
