import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IMaquinaria } from '../interface/imaquinaria';


@Injectable({
  providedIn: 'root'
})
export class MaquinariaService {

  private maquinariaCollection: AngularFirestoreCollection<IMaquinaria>;
  private maquinaria: Observable<IMaquinaria[]>;

  constructor(
    private db: AngularFirestore
  ) {
    this.maquinariaCollection = this.db.collection<IMaquinaria>('Maquinaria');
    this.maquinaria = this.maquinariaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getMaquinaria() {
    return this.maquinaria;
  }

  getMaquinariaid(id) {
    return this.maquinariaCollection.doc<IMaquinaria>(id.toString()).valueChanges();
  }
}
