import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DwellingsComponent } from './dwellings/dwellings.component';

const routes: Routes = [{ path: '', component: DwellingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DwellingsRoutingModule {}
