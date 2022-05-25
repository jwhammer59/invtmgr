import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/common/shared/shared.module';

import { PrimeModule } from 'src/app/prime/prime';

import { PaymentTypesRoutingModule } from './payment-types-routing.module';
import { PaymentTypesComponent } from './payment-types/payment-types.component';

@NgModule({
  declarations: [PaymentTypesComponent],
  imports: [CommonModule, PaymentTypesRoutingModule, PrimeModule, SharedModule],
})
export class PaymentTypesModule {}
