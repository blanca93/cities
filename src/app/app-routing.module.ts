import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CitiesComponent } from './cities/cities.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'cities',
    component: CitiesComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
