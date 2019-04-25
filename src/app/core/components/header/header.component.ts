import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { merge, Subscription } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { VisibilityState } from '@shared/enums/visibility-state.enum';
import { ScrollService } from '@shared/services/scroll.service';

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
    private readonly cdr: ChangeDetectorRef,
    private readonly scrollService: ScrollService
  ) { }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      const { scrollUp$, scrollDown$ } = this.scrollService;

      this.scrollSubscription = merge(
        scrollUp$.pipe(mapTo(VisibilityState.Visible)),
        scrollDown$.pipe(mapTo(VisibilityState.Hidden))
      )
        .subscribe(headerVisibility => {
          this.visibility = headerVisibility;
          this.cdr.detectChanges();
        });
    });
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
  }
}
