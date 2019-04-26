import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistComponent } from './pages/artist/artist.component';

@NgModule({
  declarations: [ArtistComponent],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    SharedModule
  ]
})
export class ArtistModule { }
