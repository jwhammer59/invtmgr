import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';

import { Vendor } from 'src/app/models/Vendors';
import { VendorsService } from 'src/app/services/vendors.service';

import { States } from 'src/app/models/States';
import { STATES } from 'src/app/data/state-data';

import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})
export class VendorsComponent implements OnInit {
  vendorDialog: boolean = false;
  submitted: boolean = false;

  states: States[] = STATES;

  vendors: Vendor[] = [];

  id?: string = '';

  vendor: Vendor = {
    id: '',
    vendorName: '',
    vendorCity: '',
    vendorState: [],
  };

  constructor(
    private vendorsService: VendorsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.vendorsService
      .getVendors()
      .subscribe((vendors) => (this.vendors = vendors));
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  newVendor() {
    this.submitted = false;
    this.vendorDialog = true;
  }

  onSubmit(val: Vendor, id: string) {
    this.submitted = true;

    if (this.vendor.vendorName.trim()) {
      if (this.vendor.id) {
        this.vendorsService.updateVendor(val, id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Vendor Updated',
          life: 3000,
        });
      } else {
        this.vendorsService.addVendor(val);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Vendor Added!',
          life: 3000,
        });
      }
      this.hideDialog();
      this.resetForm();
    }
  }

  deleteVendor(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Vendor Deleted!!',
        });
        this.vendorsService.deleteVendor(id);
        this.confirmationService.close();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected Vendor deletion.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled Vendor deletion.',
            });
            break;
        }
        this.confirmationService.close();
      },
    });
  }

  hideDialog() {
    this.vendorDialog = false;
    this.submitted = false;
  }

  editVendor(vendor: Vendor) {
    this.vendor = { ...vendor };
    this.id = this.vendor.id;
    this.vendorDialog = true;
  }

  resetForm() {
    this.vendor.id = '';
    this.vendor.vendorCity = '';
    this.vendor.vendorName = '';
    this.vendor.vendorState = [];
  }
}
