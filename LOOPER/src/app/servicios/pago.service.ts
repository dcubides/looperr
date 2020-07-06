import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { IPago } from '../interface/ipago';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

private pagoCollection: AngularFirestoreCollection<IPago>;
private pago: Observable<IPago[]>;

  constructor(
    private db: AngularFirestore
  ) {
    this.pagoCollection = this.db.collection<IPago>('Pago');
    this.pago = this.pagoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }

   getPago() {
    return this.pago;
  }

  getPagoid(id) {
    return this.pagoCollection.doc<IPago>(id.toString()).valueChanges();
  }
}
