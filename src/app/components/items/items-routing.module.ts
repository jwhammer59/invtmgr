import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailComponent } from './item-detail/item-detail.component';

import { ItemsComponent } from './items/items.component';

const routes: Routes = [
  { path: '', component: ItemsComponent },
  { path: 'item-detail/:id', component: ItemDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
