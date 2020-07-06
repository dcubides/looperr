import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IMisservicios } from '../interface/imisservicios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MisserviciosService {

  private misServiciosCollection: AngularFirestoreCollection<IMisservicios>;
  private misServicios: Observable<IMisservicios[]>;

  constructor(
    private db: AngularFirestore
    ) {
      this.misServiciosCollection = this.db.collection<IMisservicios>('Servicios');
      this.misServicios = this.misServiciosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    }

    getServiciosusuario(IdUsuario: string) {
      return this.misServiciosCollection.doc<IMisservicios>(IdUsuario.toString()).valueChanges();
    }

    addServiciosusuario(servicio: IMisservicios) {
      return this.misServiciosCollection.add(servicio);
}

}
