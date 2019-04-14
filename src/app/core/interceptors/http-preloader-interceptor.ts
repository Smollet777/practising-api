import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { PreloaderService } from '../../modules/preloader/preloader.service';

@Injectable()
export class HttpPreloaderInterceptor implements HttpInterceptor {

  constructor(private readonly preloaderService: PreloaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap(_ => this.preloaderService.show('http')),
        finalize(() => {
          this.preloaderService.hide('http');
        })
      );
  }
}
