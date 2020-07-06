import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { SubcategoriaproService } from '../../../servicios/subcategoriapro.service';
import { MaquinariaService } from '../../../servicios/maquinaria.service';
import { TipoprendaproService } from '../../../servicios/tipoprendapro.service';
import { CantidadService } from '../../../servicios/cantidad.service';
import { PagoService } from '../../../servicios/pago.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ICategoria } from '../../../interface/icategoria';
import { Isubcategoria } from '../../../interface/isubcategoria';
import { Itipoprenda } from '../../../interface/itipoprenda';
import { IMaquinaria } from '../../../interface/imaquinaria';
import { IPago } from '../../../interface/ipago';
import { Iinsumos } from '../../../interface/iinsumos';
import { ICantidad } from '../../../interface/icantidad';
import { InsumosService } from '../../../servicios/insumos.service';
import { MisserviciosService } from '../../../servicios/misservicios.service';
import { Icategorias } from '../../../interface/icategorias';
import { CategoriaproductoService } from 'src/app/servicios/categoriaproducto.service';
import { Iusuario } from '../../../interface/Iusuario';
import { DatosusuarioService } from 'src/app/servicios/datosusuario.service';
import { CategoriasService } from 'src/app/servicios/categorias.service';

@Component({
  selector: 'app-nuevoservicio',
  templateUrl: './nuevoservicio.page.html',
  styleUrls: ['./nuevoservicio.page.scss'],
})
export class NuevoservicioPage implements OnInit {
  idusuario: string;
  misServiciosForm: FormGroup;
  @ViewChild('createForm', { static: false }) createForm: FormGroupDirective;

  public categoria: Icategorias[];
  public subcategoria: Isubcategoria[];
  public tipoprenda: Itipoprenda[];
  public maquinaria: IMaquinaria[];
  public pago: IPago[];
  public tipoinsumo: Iinsumos[];
  public cantidad: ICantidad[];
  public usuario: Iusuario  = {
    Apellido: '',
    Nombre: '',
    id: '',
    TipoServicio: '',
    Email: ''
  };
  public categoriausuario: ICategoria = {
    id: '',
    Categoria: ''
   };

  constructor(
    private modalController: ModalController,
    private categoriasService: CategoriaproductoService,
    private subcategoriaproserivice: SubcategoriaproService,
    private maquinariaService: MaquinariaService,
    private tipoprendaproService: TipoprendaproService,
    private cantidadService: CantidadService,
    private pagoService: PagoService,
    private insumosService: InsumosService,
    private misserviciosService: MisserviciosService,
    private serviciousuario: DatosusuarioService,
    private catService: CategoriasService,
    private formBuilder: FormBuilder,
    private AFAuth: AngularFireAuth,
    private loading: LoadingController,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.AFAuth.authState.subscribe(usuario => {
      this.idusuario = usuario.uid;
      this.obtenerusuario(usuario.uid);
    });

    this.inicializar();
    this.cargarCategorias();
    this.cargarSubCategorias();
    this.cargarPagos();
    this.cargarTipoPrenda();
    this.cargarTipoInsumo();
    this.cargarMaquinaria();
    this.cargarCantidad();
  }

  async obtenerusuario(uid: string) {
    const datos = await  this.serviciousuario.getUsuario(uid).subscribe(res => {
      this.usuario = res;
      this.obtenerCat();
  });
  }

  async cargarCantidad() {
    const cat = await this.cantidadService.getCantidad().subscribe(res => {
      this.cantidad = res;
    });
  }

  async cargarMaquinaria() {
    const sub = await this.maquinariaService.getMaquinaria().subscribe(res => {
      this.maquinaria = res;
    });
  }

  async cargarTipoInsumo() {
    const insu = await this.insumosService.getInsumos().subscribe(res => {
      this.tipoinsumo = res;
    });
  }

  async cargarTipoPrenda() {
    const tipprenda = await this.tipoprendaproService.getTipoPrenda().subscribe(res => {
      this.tipoprenda = res;
    });
  }

  async cargarPagos() {
   const pag = await this.pagoService.getPago().subscribe(res => {
     this.pago = res;
   });
  }

  async cargarSubCategorias() {
    const sub = await this.subcategoriaproserivice.getSubCategoria().subscribe(res => {
      this.subcategoria = res;
    });
  }

  async cargarCategorias() {
    const cat = await this.categoriasService.getCategorias().subscribe(res => {
      this.categoria = res;
    });
  }

 async obtenerCat() {
  const cat = await this.catService.getCategoria(this.usuario.TipoServicio).subscribe(res => {
      this.categoriausuario = res;
  });
}

  inicializar() {
    this.misServiciosForm = this.formBuilder.group({
      Categoria: new FormControl('', Validators.required),
      Subcategoria: new FormControl('', Validators.required),
      TipoPrenda: new FormControl('', Validators.required),
      Maquinaria: new FormControl('', Validators.required),
      TipoInsumo: new FormControl('', Validators.required),
      Descripcion: new FormControl('', Validators.required),
      Cantidad: new FormControl('', Validators.required),
      TipoPago: new FormControl('', Validators.required),
      Horario: new FormControl('', Validators.required),
    });
  }

  async registerForm() {

    this.misserviciosService.addServiciosusuario(this.misServiciosForm.value).then( res => {
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
      message: 'Guardado correctamente.',
      color: 'success',
      animated: true,
      duration: 2000
    });
    loading.dismiss();
    toast.present();
    this.dismissModal();
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

  dismissModal() {
    this.modalController.dismiss();
  }

}
