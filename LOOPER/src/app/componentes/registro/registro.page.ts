import { ICategoria } from './../../interface/icategoria';
import { CategoriasService } from './../../servicios/categorias.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { ToastController, LoadingController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl  } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

  /*public tipoServicio: any;
  public tipoServicioSelected: number;
  public apellido: string;
  public nombre: string;
  public email: string;
  public password: string;*/
  public categoria: ICategoria[];
  login: FormGroup;


  constructor(private service: AuthService,
              private catservice: CategoriasService,
              private formBuilder: FormBuilder,
              private loading: LoadingController,
              private toast: ToastController,
              private router: Router) { }

  ngOnInit() {
    this.inicializar();
    this.cargarCategorias();
  }


  inicializar() {

    this.login = this.formBuilder.group({
      tipoServicio: new FormControl('', Validators.required),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.minLength(5), Validators.required]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.minLength(5), Validators.required]),
      email: new FormControl('', [Validators.required,
                                 Validators.maxLength(60),
                                 Validators.minLength(5),
                                 Validators.required,
                                 Validators.email]),
      password: new FormControl('', [Validators.required,
                                  Validators.maxLength(12),
                                  Validators.minLength(8),
                                  Validators.required]),

    });
  }


  async cargarCategorias() {

    const loading = await this.loading.create({
      message: 'Validando...',
      spinner: 'bubbles'
    });
    loading.present();

    const cat = await this.catservice.getCategorias().subscribe(res => {
      this.categoria = res;
    });

    loading.dismiss();
  }



  /*OnSubmitRegister() {
    this.service.register(this.email, this.password, this.nombre, this.apellido, this.tipoServicioSelected).then( res => {
    this.registro();
    }).catch(err => this.mensaje(err));
  }*/


async registerForm() {

  this.service.register(this.login.value).then( res => {
    this.registro();
    }).catch(err => this.mensaje(err));

}



  async registro() {

    const loading = await this.loading.create({
      message: 'Cargando...',
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
    //this.router.navigate(['../configuracion']);

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
