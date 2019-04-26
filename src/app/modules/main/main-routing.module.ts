import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchListComponent } from './pages/search-list/search-list.component';

const routes: Routes = [
  {
    path: '',
    component: SearchListComponent
  },
  {
    path: 'artist',
    loadChildren: './../artist/artist.module#ArtistModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule { }
