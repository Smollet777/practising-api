import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SearchResult } from 'src/app/models/searchResult';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {

  error = '';
  searchResult$: Observable<SearchResult>;

  constructor(private route: ActivatedRoute, private service: SearchService) { }

  ngOnInit() {
    this.searchResult$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getAlbums(+params.get('id')))
    );
  }

}
