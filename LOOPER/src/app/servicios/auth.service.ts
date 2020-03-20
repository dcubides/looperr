import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Iusuario } from './../interface/Iusuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private AFAuth: AngularFireAuth,
              private db: AngularFirestore) { }

  login(email: string, password: string) {

  return new Promise((resolve, rejected) => {
    this.AFAuth.auth.signInWithEmailAndPassword(email, password).then(
      user => {
        resolve(user);
      }).catch(error => rejected(error));

  });
  }

  register(email: string, password: string, nombre: string, apellido: string) {
    return new Promise((resolve, rejected) => {
      this.AFAuth.auth.createUserWithEmailAndPassword(email, password).then(
        res => {
          const uid = res.user.uid;
          this.db.collection('usuarios').doc<Iusuario>(uid).set({
            id: uid,
            Nombre: nombre,
            Apellido: apellido
          });
          resolve(res);
        }).catch(err => rejected(err));
    });
  }
}
