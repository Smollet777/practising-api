import { TestBed } from '@angular/core/testing';

import { HttpRetryService } from './http-retry.service';

describe('HttpRetryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpRetryService = TestBed.get(HttpRetryService);
    expect(service).toBeTruthy();
  });
});
