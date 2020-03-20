import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DatosusuarioService {

  constructor(private AFAuth: AngularFireAuth,
              public db: AngularFirestore) { }


getDatosUsuario(uid: string) {
  console.log(uid);
  return this.db.collection('/usuarios').doc(uid).snapshotChanges();
    }

  getUsers() {

    return new Promise<any>((resolve, reject) => {
    this.db.collection('/usuarios').snapshotChanges()
    .subscribe(snapshots => {
      resolve(snapshots);
    });
  });
}

}
