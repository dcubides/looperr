import { Component, OnInit } from '@angular/core';
import { Icategorias } from '../../interface/icategorias';
import { Isubcategoria } from '../../interface/isubcategoria';
import { AuthService } from '../../servicios/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SubcategoriaproService } from '../../servicios/subcategoriapro.service';
import { CategoriaproductoService } from '../../servicios/categoriaproducto.service';
import { TipoprendaproService } from '../../servicios/tipoprendapro.service';
import { Itipoprenda } from '../../interface/itipoprenda';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  public categoriaspro: Icategorias[];
  public subcategoria: Isubcategoria[];
  tiposPrenda: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loading: LoadingController,
    private toast: ToastController,
    private router: Router,
    private categoriasService: CategoriaproductoService,
    private subcategoriasService: SubcategoriaproService,
    private tipoprendaservice: TipoprendaproService
  ) { }

  ngOnInit() {
    this.inicializar();
    this.cargarSelects();
  }

  inicializar() {
    this.tiposPrenda = this.formBuilder.group({
      Categoria: new FormControl('', Validators.required),
      Subcategoria: new FormControl('', Validators.required),
      Descripcion: new FormControl('', Validators.required)
    });
  }

  async cargarSelects() {
    const loading = await this.loading.create({
      message: 'Validando',
      spinner: 'bubbles'
    });
    loading.present();

    const cat = this.categoriasService.getCategorias().subscribe(res => {
      this.categoriaspro = res;
    });

    const subcat = this.subcategoriasService.getSubCategoria().subscribe(res => {
      this.subcategoria = res;
    });

    loading.dismiss();
  }

  async registerForm() {

  this.tipoprendaservice.addTipoPrenda(this.tiposPrenda.value).then( res => {
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
