import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import { SearchService } from 'src/app/services/search.service';
import { Artist } from './../../models/artist';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  artist$: Observable<Artist>;

  constructor(private route: ActivatedRoute, private service: SearchService, private location: Location) { }

  ngOnInit() {
    this.artist$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getArtist(+params.get('id')))
    );
  }

  goBack(): void {
    this.location.back();
  }

}
