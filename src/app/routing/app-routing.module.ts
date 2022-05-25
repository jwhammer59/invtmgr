import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../common/home/home.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';

import { AuthGuard } from '../components/auth/auth-guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'items',
    loadChildren: () =>
      import('../components/items/items.module').then((m) => m.ItemsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'dwellings',
    loadChildren: () =>
      import('../components/dwellings/dwellings.module').then(
        (m) => m.DwellingsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'locations',
    loadChildren: () =>
      import('../components/locations/locations.module').then(
        (m) => m.LocationsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'payment-types',
    loadChildren: () =>
      import('../components/payment-types/payment-types.module').then(
        (m) => m.PaymentTypesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'vendors',
    loadChildren: () =>
      import('../components/vendors/vendors.module').then(
        (m) => m.VendorsModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
