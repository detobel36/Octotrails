import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesEntrypoint } from '../categories/categories.module';
import { HistoriesEntrypoint } from '../histories/histories.module';
import { StopResolver } from './stop.resolver';

import { StopSearchComponent } from './search/stop-search.component';
import { StopDetailComponent } from './detail/stop-detail.component';
import { StopLocationComponent } from './location/stop-location.component';
// import { StopImageDetailComponent } from './image-detail/stop-image-detail.component';

const stopRoutes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: StopSearchComponent },
  {
    path: ':stop_id',
    resolve: { stop: StopResolver },
    children: [
      { path: '', component: StopDetailComponent },
      { path: 'location', component: StopLocationComponent },
      {
        path: 'histories',
        loadChildren: '../histories/histories.module#HistoriesModule'
      },
      {
        path: 'categories',
        loadChildren: '../categories/categories.module#CategoriesModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(stopRoutes)],
  exports: [RouterModule]
})
export class StopsRoutingModule {}
