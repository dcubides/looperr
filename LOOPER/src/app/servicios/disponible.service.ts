import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Idisponible } from '../interface/idisponible';


@Injectable({
  providedIn: 'root'
})
export class DisponibleService {
private disponibleCollections: AngularFirestoreCollection<Idisponible>;
private disponible: Observable<Idisponible[]>;

  constructor(
    private db: AngularFirestore
  ) {

    this.disponibleCollections = this.db.collection<Idisponible>('disponibilidad');

    this.disponible = this.disponibleCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getDisponible(id) {
    return this.disponibleCollections.doc<Idisponible>(id.toString()).valueChanges();
  }

  updateDsiponible(disponible: Idisponible, id: string) {
    return this.disponibleCollections.doc(id).update(disponible);
  }
}
