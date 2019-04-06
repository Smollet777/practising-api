import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _query: string;
  private readonly querySubject = new Subject<string>();
  index$ = new BehaviorSubject(0);
  private _chunkSize = 25;

  set query(query: string) {
    this._query = query;
    this.querySubject.next(query);
    this.index$.next(0);
  }

  get query(): string {
    return this._query;
  }

  get query$(): Observable<string> {
    return this.querySubject.asObservable();
  }

  set chunkSize(value: number) {
    if (value > 0) {
      this._chunkSize = value;
    }
  }

  get chunkSize(): number {
    return this._chunkSize;
  }

  nextChunk(): number {
    const value = this.index$.value + this._chunkSize;
    this.index$.next(value);

    return value;
  }

  prevChunk(): boolean | number {
    const value = this.index$.value - this._chunkSize;
    if (value < 0) {
      return false;
    }
    this.index$.next(value);

    return value;
  }
}
