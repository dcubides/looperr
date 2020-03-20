import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { ToastController, LoadingController  } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

  public apellido: string;
  public nombre: string;
  public email: string;
  public password: string;

  constructor(private service: AuthService,
              private loading: LoadingController,
              private toast: ToastController,
              private router: Router) { }

  ngOnInit() {
  }

  OnSubmitRegister() {
    this.service.register(this.email, this.password, this.nombre, this.apellido).then( res => {
    this.registro();
    }).catch(err => this.mensaje(err));
  }

  async registro() {

    const loading = await this.loading.create({
      message: 'Validando...',
      spinner: 'bubbles'
    });
    loading.present();

    const toast = await  this.toast.create({
      message: 'Bienvenido.',
      color: 'success',
      animated: true,
      duration: 2000
    });
    loading.dismiss();
    toast.present();
    this.router.navigate(['../login']);

  }

  async mensaje(err: string) {

    const loading = await this.loading.create({
      message: 'Validando...',
      spinner: 'bubbles'
    });
    loading.present();

    const toast = await  this.toast.create({
      message: err,
      animated: true,
      color: 'danger',
      duration: 2000
    });

    loading.dismiss();
    toast.present();

  }

}
