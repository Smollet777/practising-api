import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRetryService {

  private readonly isErrorSubject = new Subject<boolean>();
  private readonly retrySubject = new Subject<any>();

  set isError(value: boolean) {
    this.isErrorSubject.next(value);
  }

  get isError$(): Observable<boolean> {
    return this.isErrorSubject.asObservable();
  }

  set retry(value) {
    this.retrySubject.next(value);
  }

  get retry$(): Observable<string> {
    return this.retrySubject.asObservable();
  }
}
