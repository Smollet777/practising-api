import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { ArtistComponent } from '../components/artist/artist.component';

const routes: Routes = [
  { path: ':id', component: ArtistComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ArtistComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class ArtistModule { }
