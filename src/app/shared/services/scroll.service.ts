import { Injectable } from '@angular/core';

import { fromEvent, Observable, partition } from 'rxjs';
import { distinctUntilChanged, map, pairwise, share, throttleTime } from 'rxjs/operators';

import { ScrollDirection } from '@shared/enums/scroll-direction.enum';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  scrollUp$: Observable<ScrollDirection>;
  scrollDown$: Observable<ScrollDirection>;

  private readonly scroll$ = fromEvent(window, 'scroll')
    .pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): ScrollDirection => (y2 < y1 ? ScrollDirection.Up : ScrollDirection.Down)),
      distinctUntilChanged(),
      share()
    );

  constructor() {
    [this.scrollUp$, this.scrollDown$] =
      partition(this.scroll$, (scrollDirection: ScrollDirection) => scrollDirection === ScrollDirection.Up);
  }
}
