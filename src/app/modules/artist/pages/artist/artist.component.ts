import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { ArtistService } from '@core/http/artist.service';
import { Artist } from '@shared/interfaces/artist';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  artist$: Observable<Artist>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: ArtistService,
    private readonly location: Location) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.artist$ = this.service.getArtist(+id);
  }

  goBack(): void {
    this.location.back();
  }

}
