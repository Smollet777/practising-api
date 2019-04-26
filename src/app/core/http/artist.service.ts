import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Artist } from '@shared/interfaces/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) { }

  getArtist(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.baseUrl}/artist/${id}`);
  }
}
