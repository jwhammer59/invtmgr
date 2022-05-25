import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Vendor } from '../models/Vendors';

@Injectable({
  providedIn: 'root',
})
export class VendorsService {
  vendorCollection!: AngularFirestoreCollection<Vendor>;
  vendorDoc!: AngularFirestoreDocument<Vendor>;
  vendors!: Observable<Vendor[]>;
  vendor!: Observable<any>;

  dbPath: string = 'prime-inv-vendor';

  constructor(private afs: AngularFirestore) {
    this.vendorCollection = afs.collection<Vendor>(`${this.dbPath}`);
  }

  getVendors() {
    this.vendors = this.vendorCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Vendor;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.vendors;
  }

  getVendor(id: string): Observable<Vendor> {
    this.vendorDoc = this.afs.doc<Vendor>(`${this.dbPath}/${id}`);
    this.vendor = this.vendorDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Vendor;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.vendor;
  }

  addVendor(vendor: Vendor) {
    this.vendorCollection.add(vendor);
  }

  updateVendor(vendor: Vendor, id: string) {
    this.vendorDoc = this.afs.doc(`${this.dbPath}/${id}`);
    this.vendorDoc.update(vendor);
  }

  deleteVendor(vendor: Vendor['id']) {
    this.vendorDoc = this.afs.doc(`${this.dbPath}/${vendor}`);
    this.vendorDoc.delete();
  }
}
