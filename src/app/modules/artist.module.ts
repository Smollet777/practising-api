import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { ArtistComponent } from '../components/artist/artist.component';
import { AlbumsListComponent } from './../components/albums-list/albums-list.component';

const routes: Routes = [
  { path: ':id', component: ArtistComponent, pathMatch: 'full' },
  { path: ':id/albums', component: AlbumsListComponent }
];

@NgModule({
  declarations: [
    ArtistComponent,
    AlbumsListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class ArtistModule { }
