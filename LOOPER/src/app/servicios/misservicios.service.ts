import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IMisservicios } from '../interface/imisservicios';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class MisserviciosService {

  private misServiciosCollection: AngularFirestoreCollection<IMisservicios>;
  private misServicios: Observable<IMisservicios[]>;

  constructor(
    private AFAuth: AngularFireAuth,
    public db: AngularFirestore
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

    getServiciosid(Id: string) {
      return this.misServiciosCollection.doc<IMisservicios>(Id).valueChanges().pipe(
        take(1),
        map(servicio => {
          servicio.id = Id;
          return servicio;
        })
      );
    }

    getServiciosusuario(IdUsuario: string) {

      console.log(this.db.collection<IMisservicios>('Servicios', ref => ref.where('Idusuario', '==', IdUsuario)).valueChanges());
      return  this.db.collection<IMisservicios>('Servicios', ref => ref.where('Idusuario', '==', IdUsuario)).valueChanges();
    }

    addServiciosusuario(servicio: IMisservicios) {
      return this.misServiciosCollection.add(servicio).then(ref => this.actulizarSevicio(ref.id));
}

    actulizarSevicio(idServicio) {
      const servicio = this.misServiciosCollection.doc(idServicio);
      servicio.update({id : idServicio});
}

    eliminarServicio(idServicio) {
      this.misServiciosCollection.doc(idServicio).delete();
    }

}
