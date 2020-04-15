import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import { DisponibleService } from '../../servicios/disponible.service';
import { Idisponible } from '../../interface/idisponible';




@Component({
  selector: 'app-disponibilidad',
  templateUrl: './disponibilidad.page.html',
  styleUrls: ['./disponibilidad.page.scss'],
})
export class DisponibilidadPage implements OnInit {

  diponibilidad: boolean;
  disponibilidadDesc: string;
  disponible: Idisponible;
  idusuario: string;

  constructor(
            private AFAuth: AngularFireAuth,
            private servicio: DisponibleService,
            private loading: LoadingController
  ) { }

  ngOnInit() {
    this.AFAuth.authState.subscribe(usuario => {
      this.idusuario = usuario.uid;
      this.obtenerDisponibilidaddeusuario(usuario.uid);
    });
  }

  async obtenerDisponibilidaddeusuario(usuario) {
    const loading = await this.loading.create({
      message: 'Cargando...',
      spinner: 'bubbles',
      duration: 50000,
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    loading.present();

    this.servicio.getDisponible(usuario).subscribe(res => {
      this.disponible = res;
      this.MostrarDisponible();
      loading.dismiss();
  });
  }

  MostrarDisponible() {
    if (this.disponible.Disponible === '0') {
      this.disponibilidadDesc = 'NO DISPONIBLE';
    } else {
      this.disponibilidadDesc = 'DISPONIBLE';
    }
  }

  async segmentChanged(e) {
    const loading = await this.loading.create({
      message: 'Cargando...',
      spinner: 'bubbles',
      duration: 50000,
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    loading.present();

    this.disponible = {
      id: this.idusuario,
      Disponible: e.detail.value
    };

    this.servicio.updateDsiponible(this.disponible, this.idusuario);
    loading.dismiss();

  }

}
