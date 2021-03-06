import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { PageNotFoundComponent } from './core/layouts/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('./modules/main/main.module')
    .then(m => m.MainModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
