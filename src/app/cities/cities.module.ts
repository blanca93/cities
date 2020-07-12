import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../shared/shared.module';
import { CitiesComponent } from './cities.component';


@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [CitiesComponent]
})
export class CitiesModule { }
