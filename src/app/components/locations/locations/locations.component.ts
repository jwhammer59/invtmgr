import { Component, OnInit } from '@angular/core';

import { Location } from 'src/app/models/Locations';
import { LocationsService } from 'src/app/services/locations.service';

import { Dwelling } from 'src/app/models/Dwelling';
import { DwellingsService } from 'src/app/services/dwellings.service';

import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit {
  locationDialog: boolean = false;
  submitted: boolean = false;

  locations: Location[] = [];
  dwellings$!: Observable<Dwelling[]>;

  id?: string = '';

  location: Location = {
    id: '',
    locationName: '',
    locationDwelling: '',
    locationLevel: '',
  };

  constructor(
    private locationsService: LocationsService,
    private dwellingsService: DwellingsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.locationsService
      .getLocations()
      .subscribe((locations) => (this.locations = locations));
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.dwellings$ = this.dwellingsService.getDwellings();
  }

  newLocation() {
    this.submitted = true;
    this.locationDialog = true;
  }

  onSubmit(val: Location, id: string) {
    this.submitted = true;

    if (this.location.locationName.trim()) {
      if (this.location.id) {
        this.locationsService.updateLocation(val, id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Location Updated',
          life: 3000,
        });
      } else {
        this.locationsService.addLocation(val);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Location Added!',
          life: 3000,
        });
      }
      this.hideDialog();
      this.resetForm();
    }
  }

  deleteLocation(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Location Deleted!!',
        });
        this.locationsService.deleteLocation(id);
        this.confirmationService.close();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected Location deletion.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled Location deletion.',
            });
            break;
        }
        this.confirmationService.close();
      },
    });
  }

  hideDialog() {
    this.locationDialog = false;
    this.submitted = false;
  }

  editLocation(location: Location) {
    this.location = { ...location };
    this.id = this.location.id;
    this.locationDialog = true;
    console.log(location);
    console.log(this.location);
  }

  resetForm() {
    this.location.id = '';
    this.location.locationName = '';
    this.location.locationDwelling = '';
    this.location.locationLevel = '';
  }
}
