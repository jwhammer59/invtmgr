import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/common/shared/shared.module';
import { PrimeModule } from 'src/app/prime/prime';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations/locations.component';

@NgModule({
  declarations: [LocationsComponent],
  imports: [CommonModule, LocationsRoutingModule, SharedModule, PrimeModule],
})
export class LocationsModule {}
