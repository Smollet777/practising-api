import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { fromEvent, merge, Subscription } from 'rxjs';
import { distinctUntilChanged, map, mapTo, pairwise, partition, share, throttleTime } from 'rxjs/operators';

import { ScrollDirection } from '../../../shared/enums/scroll-direction.enum';
import { VisibilityState } from '../../../shared/enums/visibility-state.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private scrollSubscription: Subscription;
  visibility = VisibilityState.Visible;

  constructor(
    private readonly zone: NgZone,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {

      const [scrollUp$, scrollDown$] = partition((scrollDirection: ScrollDirection) =>
        scrollDirection === ScrollDirection.Up)(

          fromEvent(window, 'scroll')
            .pipe(
              throttleTime(100),
              map(() => window.pageYOffset),
              pairwise(),
              map(([y1, y2]): ScrollDirection => (y2 < y1 ? ScrollDirection.Up : ScrollDirection.Down)),
              distinctUntilChanged(),
              share()
            )

        );

      this.scrollSubscription = merge(
        scrollUp$.pipe(mapTo(VisibilityState.Visible)),
        scrollDown$.pipe(mapTo(VisibilityState.Hidden))
      )
        .subscribe((visibility: VisibilityState) => {
          this.visibility = visibility;
          this.cdr.detectChanges();
        });
    });
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
  }
}
