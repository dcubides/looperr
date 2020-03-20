import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController  } from '@ionic/angular';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService,
              public router: Router,
              public toast: ToastController,
              public loading: LoadingController) { }

  ngOnInit() {
  }

  OnSubmitLogin() {

    this.authService.login(this.email, this.password).then( res => {
      this.ingreso();

    }).catch(err => this.mensaje());
  }

  async mensaje() {

    const loading = await this.loading.create({
      message: 'Validando...',
      spinner: 'bubbles'
    });
    loading.present();

    const toast = await  this.toast.create({
      message: 'Datos incorrectos.',
      animated: true,
      color: 'danger',
      duration: 2000
    });

    loading.dismiss();
    toast.present();

  }

  async ingreso() {
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
    this.router.navigate(['../home']);
  }

  nuevoUsuario() {
    this.router.navigate(['../registro']);
  }

}
