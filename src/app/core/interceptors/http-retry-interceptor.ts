import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { merge, Observable, throwError, timer } from 'rxjs';
import { finalize, mergeMap, retryWhen } from 'rxjs/operators';

import { HttpRetryService } from './../../modules/http-retry/http-retry.service';

@Injectable()
export class HttpRetryInterceptor implements HttpInterceptor {

  constructor(private readonly HRS: HttpRetryService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        retryWhen(this.retryStrategy())
      );
  }

  private readonly retryStrategy = ({
    scalingDuration = 1000,
    excludedStatusCodes = []
  }: {
      scalingDuration?: number,
      excludedStatusCodes?: number[]
    } = {}) => (attempts: Observable<any>) =>
      attempts.pipe(
        mergeMap((error, i) => {
          const retryAttempt = i + 1;
          // if response is a status code we don't wish to retry -> throw error
          if (
            excludedStatusCodes.find(e => e === error.status)
          ) {
            return throwError(error);
          }
          console.warn(
            `Attempt ${retryAttempt}: retrying...`
          );
          this.HRS.isError = true;

          return merge(
            // retry on click
            this.HRS.retry$,
            // retry after 1s, 2s, etc...
            timer(retryAttempt * scalingDuration)
          );
        }),
        finalize(() => this.HRS.isError = false)
      );

}
