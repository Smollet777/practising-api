import { SearchResult } from './../models/searchResult';
import { Artist } from '../models/artist';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseURL = 'https://cors-anywhere.herokuapp.com/http://api.deezer.com';
  private params = '';
  private dataSource = new BehaviorSubject<SearchResult>(new SearchResult());
  data = this.dataSource.asObservable();

  constructor(private http: HttpClient) { }

  updateData(data: SearchResult) {
    this.dataSource.next(data);
  }

  search(query: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(`${this.baseURL}/search?${this.params}q=${query}`);
  }

  getArtist(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.baseURL}/artist/${id}`);
  }
}
