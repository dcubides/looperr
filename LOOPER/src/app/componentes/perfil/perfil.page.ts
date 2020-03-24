import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatosusuarioService } from '../../servicios/datosusuario.service';
import { Iusuario } from './../../interface/Iusuario';
import { LoadingController } from '@ionic/angular';
import { ICategoria } from './../../interface/icategoria';
import { CategoriasService } from './../../servicios/categorias.service';





@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

usuario: Iusuario  = {
  Apellido: '',
  Nombre: '',
  id: '',
  TipoServicio: '',
  Email: ''
};

todos: Iusuario[];

categoria: ICategoria = {
 id: '',
 Categoria: ''
};


  constructor(private AFAuth: AngularFireAuth,
              private servicio: DatosusuarioService,
              public loading: LoadingController,
              private catService: CategoriasService) { }

  ngOnInit() {
    this.AFAuth.authState.subscribe(usuario => {
      this.obtenerusuario(usuario.uid);
    });

  }

  async obtenerusuario(usuario) {

    const loading = await this.loading.create({
      message: 'Cargando...',
      spinner: 'bubbles',
      duration: 50000,
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    loading.present();

    this.servicio.getUsuario(usuario).subscribe(res => {
      this.usuario = res;
      this.obtenerCat();
      loading.dismiss();
  });
  }

  obtenerCat(){
    this.catService.getCategoria(this.usuario.TipoServicio).subscribe(res => {
      this.categoria = res;
  });
  }

}
