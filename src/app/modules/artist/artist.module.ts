import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ArtistRoutingModule } from './artist-routing.module';
import { TopTracksComponent } from './components/top-tracks/top-tracks.component';
import { ArtistComponent } from './pages/artist/artist.component';

@NgModule({
  declarations: [
    ArtistComponent,
    TopTracksComponent
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    SharedModule
  ]
})
export class ArtistModule { }
