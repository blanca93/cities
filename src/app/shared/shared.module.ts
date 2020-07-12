import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  exports: [
    RouterModule,
    CommonModule
  ],
  declarations: [NotFoundComponent]
})
export class SharedModule { }
