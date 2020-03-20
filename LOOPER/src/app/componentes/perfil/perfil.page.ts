import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatosusuarioService } from '../../servicios/datosusuario.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

uidUser: string;
emailUser: string;

  constructor(private AFAuth: AngularFireAuth,
              private servicio: DatosusuarioService) { }

  ngOnInit() {
    this.AFAuth.authState.subscribe(usuario => {
    this.obtenerusuario(usuario.uid);
    });
  }

  async obtenerusuario(usuario: string) {

  const usuarioid = await this.servicio.getDatosUsuario(usuario).subscribe(us => {
    console.log(us);
    });

  const s = this.servicio.getUsers();

  console.log(s);

  }

}
