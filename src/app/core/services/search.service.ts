import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _query: string;
  private readonly querySubject = new Subject<string>();

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
}
