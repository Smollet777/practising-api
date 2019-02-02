import { SearchResult } from './../models/searchResult';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseURL = 'https://cors-anywhere.herokuapp.com/http://api.deezer.com/search?';
  params = 'limit=2&';
  constructor(private http: HttpClient) { }

  search(query: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(`${this.baseURL}${this.params}q=${query}`);
  }
}
