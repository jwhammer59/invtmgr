import { Component, OnInit } from '@angular/core';

import { Item } from 'src/app/models/Item';
import { ItemsService } from 'src/app/services/items.service';

import { Location } from 'src/app/models/Locations';
import { LocationsService } from 'src/app/services/locations.service';

import { Vendor } from 'src/app/models/Vendors';
import { VendorsService } from 'src/app/services/vendors.service';

import { PaymentType } from 'src/app/models/PaymentTypes';
import { PaymentTypesService } from 'src/app/services/payment-types.service';

import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  itemDialog: boolean = false;
  submitted: boolean = false;

  items: Item[] = [];
  locations$!: Observable<Location[]>;
  vendors$!: Observable<Vendor[]>;
  paymentTypes$!: Observable<PaymentType[]>;

  id?: string = '';

  item: Item = {
    id: '',
    itemName: '',
    itemDesc: '',
    itemMfg: '',
    itemModelNum: '',
    itemSerialNum: '',
    itemQty: 0,
    itemExtWarranty: false,
    itemPurchaseDate: '',
    itemPurchasePrice: '',
    itemVendor: { vendorName: '', vendorCity: '', vendorState: '' },
    itemPaymentType: { paymentTypeName: '', paymentTypeIssuedBy: '' },
    itemLocation: { locationName: '', locationDwelling: '', locationLevel: '' },
  };

  constructor(
    private itemsService: ItemsService,
    private locationsService: LocationsService,
    private vendorsService: VendorsService,
    private paymentTypesService: PaymentTypesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.itemsService.getItems().subscribe((items) => (this.items = items));
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.locations$ = this.locationsService.getLocations();
    this.vendors$ = this.vendorsService.getVendors();
    this.paymentTypes$ = this.paymentTypesService.getPaymentTypes();
  }

  newItem() {
    this.submitted = true;
    this.itemDialog = true;
  }

  onSubmit(val: Item, id: string) {
    this.submitted = true;

    if (this.item.itemName.trim()) {
      if (this.item.id) {
        this.itemsService.updateItem(val, id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Item Updated',
          life: 3000,
        });
      } else {
        this.itemsService.addItem(val);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Item Added!',
          life: 3000,
        });
      }
      this.hideDialog();
      this.resetForm();
    }
  }

  deleteItem(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Item Deleted!!',
        });
        this.itemsService.deleteItem(id);
        this.confirmationService.close();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected Item deletion.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled Item deletion.',
            });
            break;
        }
        this.confirmationService.close();
      },
    });
  }

  hideDialog() {
    this.itemDialog = false;
    this.submitted = false;
  }

  editItem(item: Item) {
    this.item = { ...item };
    this.id = this.item.id;
    this.itemDialog = true;
  }

  resetForm() {
    this.item.id = '';
    this.item.itemName = '';
  }
}
