import { TestBed } from '@angular/core/testing';

import { TopTracksService } from './top-tracks.service';

describe('TopTracksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopTracksService = TestBed.get(TopTracksService);
    expect(service).toBeTruthy();
  });
});
