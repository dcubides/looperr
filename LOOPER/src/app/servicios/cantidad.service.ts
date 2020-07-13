import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ICantidad } from '../interface/icantidad';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CantidadService {

  private cantidadCollection: AngularFirestoreCollection<ICantidad>;
  private cantidad: Observable<ICantidad[]>;

  constructor(
    private db: AngularFirestore
  ) {
    this.cantidadCollection = this.db.collection<ICantidad>('Cantidad');
    this.cantidad = this.cantidadCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getCantidad() {
    return this.cantidad;
  }

  getCantidadid(id) {
    return this.cantidadCollection.doc<ICantidad>(id.toString()).valueChanges();
  }
}
