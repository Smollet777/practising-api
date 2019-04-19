import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { HttpRetryService } from './../http-retry.service';

@Component({
  selector: 'app-http-retry',
  templateUrl: './http-retry.component.html',
  styles: ['div{text-align:center}']
})
export class HttpRetryComponent implements OnInit, OnDestroy {

  private subscription$: Subscription;
  isError: boolean;

  constructor(private readonly HRS: HttpRetryService) { }

  ngOnInit(): void {
    this.subscription$ = this.HRS.isError$.subscribe(
      value => this.isError = value
    );
  }

  retry(): void {
    this.HRS.retry = 'click';
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
