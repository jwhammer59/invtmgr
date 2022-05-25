import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Location } from '../models/Locations';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  locationCollection!: AngularFirestoreCollection<Location>;
  locationDoc!: AngularFirestoreDocument<Location>;
  locations!: Observable<Location[]>;
  location!: Observable<any>;

  dbPath: string = 'prime-inv-location';

  constructor(private afs: AngularFirestore) {
    this.locationCollection = afs.collection<Location>(`${this.dbPath}`);
  }

  getLocations() {
    this.locations = this.locationCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Location;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.locations;
  }

  getLocation(id: string): Observable<Location> {
    this.locationDoc = this.afs.doc<Location>(`${this.dbPath}/${id}`);
    this.location = this.locationDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Location;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.location;
  }

  addLocation(location: Location) {
    this.locationCollection.add(location);
  }

  updateLocation(location: Location, id: string) {
    this.locationDoc = this.afs.doc(`${this.dbPath}/${id}`);
    this.locationDoc.update(location);
  }

  deleteLocation(location: Location['id']) {
    this.locationDoc = this.afs.doc(`${this.dbPath}/${location}`);
    this.locationDoc.delete();
  }
}
