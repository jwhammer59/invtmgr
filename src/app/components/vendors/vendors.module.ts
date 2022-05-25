import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/common/shared/shared.module';
import { PrimeModule } from 'src/app/prime/prime';

import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorsComponent } from './vendors/vendors.component';

@NgModule({
  declarations: [VendorsComponent],
  imports: [CommonModule, VendorsRoutingModule, PrimeModule, SharedModule],
  providers: [],
})
export class VendorsModule {}
