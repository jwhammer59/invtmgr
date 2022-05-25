export class Item {
  id?: string;
  itemName: string = '';
  itemDesc: string = '';
  itemMfg: string = '';
  itemModelNum: string = '';
  itemSerialNum: string = '';
  itemQty: number = 0;
  itemExtWarranty: boolean = false;
  itemPurchaseDate: any;
  itemPurchasePrice: string = '';
  itemVendor: { vendorName: string; vendorCity: string; vendorState: string } =
    { vendorName: '', vendorCity: '', vendorState: '' };
  itemPaymentType: { paymentTypeName: string; paymentTypeIssuedBy: string } = {
    paymentTypeName: '',
    paymentTypeIssuedBy: '',
  };
  itemLocation: {
    locationName: string;
    locationDwelling: string;
    locationLevel: string;
  } = { locationName: '', locationDwelling: '', locationLevel: '' };
}
