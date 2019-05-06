import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { TopTracksService } from '@core/http/top-tracks.service';
import { Track } from '@shared/interfaces/track';
import { SearchResult } from '@shared/models/search-result';

@Component({
  selector: 'app-top-tracks',
  templateUrl: './top-tracks.component.html',
  styleUrls: ['./top-tracks.component.scss']
})
export class TopTracksComponent implements OnInit {

  readonly result$ = new BehaviorSubject<SearchResult<Track>>(new SearchResult());
  private readonly id = +this.route.snapshot.paramMap.get('id');
  @Input() limit: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: TopTracksService
  ) { }

  ngOnInit(): void {
    if (!this.limit) {
      this.limit = 5;
    }
    this.service.getTopTracks(this.id, this.limit)
      .subscribe(value => this.result$.next(value));
  }

}
