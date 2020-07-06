import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Iinsumos } from '../interface/iinsumos';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  private insumosCollection: AngularFirestoreCollection<Iinsumos>;
  private insumos: Observable<Iinsumos[]>;

  constructor(
    private db: AngularFirestore
  ) {
    this.insumosCollection = this.db.collection<Iinsumos>('Insumos');
    this.insumos = this.insumosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getInsumos() {
    return this.insumos;
  }

  getInsumosId(id) {
    return this.insumosCollection.doc<Iinsumos>(id.toString()).valueChanges();
  }


}
