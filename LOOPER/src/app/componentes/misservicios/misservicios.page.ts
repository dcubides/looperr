import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet, LoadingController } from '@ionic/angular';
import { MisserviciosService } from '../../servicios/misservicios.service';
import { IMisservicios } from '../../interface/imisservicios';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { NuevoservicioPage } from './nuevoservicio/nuevoservicio.page';



@Component({
  selector: 'app-misservicios',
  templateUrl: './misservicios.page.html',
  styleUrls: ['./misservicios.page.scss'],
})
export class MisserviciosPage implements OnInit {

  public  misServicios: IMisservicios[];
  idusuario: string;

  constructor(
    private AFAuth: AngularFireAuth,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private ServiciosService: MisserviciosService,
    private loading: LoadingController
  ) {

   }

  ngOnInit() {
    this.AFAuth.authState.subscribe(usuario => {
      this.idusuario = usuario.uid;
      this.obtenerServiciosdeusuario(usuario.uid);
    });
  }

  async obtenerServiciosdeusuario(usuario) {
    const loading = await this.loading.create({
      message: 'Cargando...',
      spinner: 'bubbles',
      duration: 50000,
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    loading.present();

    const servicios = await this.ServiciosService.getServiciosusuario(usuario).subscribe(res => {
      this.misServicios = res;
    });

    loading.dismiss();
  }


  async nuevoServicioModal() {
    const modal = await this.modalController.create({
      component: NuevoservicioPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    modal.onWillDismiss().then(() => {
      this.obtenerServiciosdeusuario(this.idusuario);
    });

    return await modal.present();
  }

}
