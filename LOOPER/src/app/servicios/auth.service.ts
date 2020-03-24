import { Injectable, ɵConsole } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Iusuarioreg } from './../interface/iusuarioreg';



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

  register(login: Iusuarioreg) {

    return new Promise((resolve, rejected) => {
      this.AFAuth.auth.createUserWithEmailAndPassword(login.email, login.password).then(
        res => {
          const uid = res.user.uid;
          this.db.collection('usuarios').doc(uid).set({
            id: uid,
            Nombre: login.nombre,
            Apellido: login.apellido,
            Email: login.email,
            TipoServicio: login.tipoServicio
          });
          resolve(res);
        }).catch(err => rejected(err));
    });
  }
}
