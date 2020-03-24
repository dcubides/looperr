import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Iusuario } from '../interface/Iusuario';



@Injectable({
  providedIn: 'root'
})
export class DatosusuarioService {


private usuarioCollection: AngularFirestoreCollection<Iusuario>;
private usuario: Observable<Iusuario[]>;

  constructor(private AFAuth: AngularFireAuth,
              public db: AngularFirestore) {
      this.usuarioCollection = this.db.collection<Iusuario>('usuarios');

      this.usuario = this.usuarioCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map( a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );

    }


getUsuarios() {
  return this.usuario;
}

getUsuario(id) {
  //return this.usuarioCollection.doc<Iusuario>(id).valueChanges();
  return this.usuarioCollection.doc<Iusuario>(id).valueChanges().pipe(
    take(1),
    map(usu => {
      usu.id = id;
      return usu;
    })
  )
}

updateUsuario(user: Iusuario, id: string) {
  return this.usuarioCollection.doc(id).update(user);
}

addUsuario(user: Iusuario) {
  return this.usuarioCollection.add(user);
}

removeUsuario(id) {
  return this.usuarioCollection.doc(id).delete();
}


}
