import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadGuard } from './core/guards/load.guard';

const routes: Routes = [
  { path: 'load', loadChildren: './pages/load/load.module#LoadPageModule' },
  { path: 'setup', canLoad: [LoadGuard], loadChildren: './pages/setup/setup.module#SetupPageModule' },
  { path: '', canLoad: [LoadGuard], loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'sample', canLoad: [LoadGuard], loadChildren: './pages/samplePage/sample.module#SamplePageModule' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
