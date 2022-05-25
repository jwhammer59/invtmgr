import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Item } from 'src/app/models/Item';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {
  id: string = '';
  item: Item = {
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.itemsService.getItem(this.id).subscribe((item) => {
      this.item = item;
    });
  }
}
