import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [WelcomeComponent]
})
export class WelcomeModule { }
