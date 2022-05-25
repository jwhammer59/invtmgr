import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/common/shared/shared.module';
import { PrimeModule } from 'src/app/prime/prime';

import { DwellingsRoutingModule } from './dwellings-routing.module';
import { DwellingsComponent } from './dwellings/dwellings.component';

@NgModule({
  declarations: [DwellingsComponent],
  imports: [CommonModule, DwellingsRoutingModule, SharedModule, PrimeModule],
})
export class DwellingsModule {}
