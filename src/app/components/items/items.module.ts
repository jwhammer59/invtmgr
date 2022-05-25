import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items/items.component';

import { SharedModule } from 'src/app/common/shared/shared.module';
import { PrimeModule } from 'src/app/prime/prime';
import { ItemDetailComponent } from './item-detail/item-detail.component';

@NgModule({
  declarations: [ItemsComponent, ItemDetailComponent],
  imports: [CommonModule, ItemsRoutingModule, SharedModule, PrimeModule],
})
export class ItemsModule {}
