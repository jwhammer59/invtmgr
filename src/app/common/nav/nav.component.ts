import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

import { AuthService } from 'src/app/services/auth.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  loggedInUser: any = 'Jeff Test';
  subscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  items: MenuItem[] = [];

  ngOnInit() {
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.items = [
      {
        label: 'Items',
        icon: 'pi pi-fw pi-list',
        routerLink: ['items'],
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Dwellings',
            icon: 'pi pi-fw pi-building',
            routerLink: ['dwellings'],
          },
          {
            label: 'Locations',
            icon: 'pi pi-fw pi-compass',
            routerLink: ['locations'],
          },
          {
            label: 'Vendors',
            icon: 'pi pi-fw pi-shopping-bag',
            routerLink: ['vendors'],
          },
          {
            label: 'Payment Types',
            icon: 'pi pi-fw pi-credit-card',
            routerLink: ['payment-types'],
          },
        ],
      },
    ];
  }

  onLogoutClick() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.loggedInUser = '';
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
