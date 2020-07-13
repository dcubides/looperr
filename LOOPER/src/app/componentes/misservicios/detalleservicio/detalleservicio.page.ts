import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController, AnimationController } from '@ionic/angular';
import { CategoriaproductoService } from 'src/app/servicios/categoriaproducto.service';
import { SubcategoriaproService } from 'src/app/servicios/subcategoriapro.service';
import { MaquinariaService } from 'src/app/servicios/maquinaria.service';
import { TipoprendaproService } from 'src/app/servicios/tipoprendapro.service';
import { CantidadService } from 'src/app/servicios/cantidad.service';
import { PagoService } from 'src/app/servicios/pago.service';
import { InsumosService } from 'src/app/servicios/insumos.service';
import { MisserviciosService } from 'src/app/servicios/misservicios.service';
import { DatosusuarioService } from 'src/app/servicios/datosusuario.service';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Icategorias } from 'src/app/interface/icategorias';
import { Isubcategoria } from 'src/app/interface/isubcategoria';
import { Itipoprenda } from 'src/app/interface/itipoprenda';
import { IMaquinaria } from 'src/app/interface/imaquinaria';
import { IPago } from 'src/app/interface/ipago';
import { Iinsumos } from 'src/app/interface/iinsumos';
import { ICantidad } from 'src/app/interface/icantidad';
import { Iusuario } from 'src/app/interface/Iusuario';
import { ICategoria } from 'src/app/interface/icategoria';
import { Router, ActivatedRoute } from '@angular/router';
import { IMisservicios } from 'src/app/interface/imisservicios';

@Component({
  selector: 'app-detalleservicio',
  templateUrl: './detalleservicio.page.html',
  styleUrls: ['./detalleservicio.page.scss'],
})
export class DetalleservicioPage implements OnInit {

  public categoria: Icategorias = {
    id: '',
    Descripcion: 'No aplica'
   };

  public subcategoria: Isubcategoria = {
    id: 0,
    Descripcion: 'No aplica'
   };

  public tipoprenda: Itipoprenda = {
    id: '',
    Categoria: null,
    Subcategoria: null,
    Descripcion: 'No aplica'
  };
  public maquinaria: IMaquinaria = {
    id: null,
    Descripcion: 'No aplica',
  };
  public pago: IPago  = {
    id: null,
    Descripcion: 'No aplica',
  };
  public tipoinsumo: Iinsumos  = {
    id: null,
    Descripcion: 'No aplica',
  };
  public cantidad: ICantidad  = {
    id: null,
    Descripcion: 'No aplica',
  };
  public usuario: Iusuario  = {
    Apellido: '',
    Nombre: '',
    id: '',
    TipoServicio: '',
    Email: ''
  };
  public categoriausuario: ICategoria = {
    id: null,
    Categoria: ''
   };

   public servicio: IMisservicios = {
    id: '',
    Cantidad: '',
    Categoria: 0,
    Descripcion: '',
    Domicilio: '',
    Horario: 0,
    Idusuario: '',
    Maquinaria: 0,
    Subcategoria: 0,
    TipoInsumo: 0,
    TipoPago: 0,
    TipoPrenda: 0
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
    private toast: ToastController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private animationCtrl: AnimationController
  ) {

   }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.obtenerusuario(id);
  }

  async obtenerusuario(id) {

    const loading = await this.loading.create({
      message: 'Cargando...',
      spinner: 'bubbles',
      duration: 50000,
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    loading.present();

    this.misserviciosService.getServiciosid(id).subscribe(res => {
    this.servicio = res;
    
    this.cargarCantidad(res.Cantidad);
    this.cargarCategorias(res.Categoria);
    this.cargarMaquinaria(res.Maquinaria);
    this.cargarPagos(res.TipoPago);
    this.cargarSubCategorias(res.Subcategoria);
    this.cargarTipoInsumo(res.TipoInsumo);
    this.cargarTipoPrenda(res.TipoPrenda);

    loading.dismiss();
  });
  }

  async cargarCantidad(s) {
  if (s !== '') {
    const cat = await this.cantidadService.getCantidadid(s).subscribe(res => {
      this.cantidad = res;
    });
  }
  }

  async cargarMaquinaria(s) {
    if (s !== '') {
    const sub = await this.maquinariaService.getMaquinariaid(s).subscribe(res => {
      this.maquinaria = res;
    });
  }
  }

  async cargarTipoInsumo(s) {
    if (s !== '') {
    const insu = await this.insumosService.getInsumosId(s).subscribe(res => {
      this.tipoinsumo = res;
    });
  }
  }

  async cargarTipoPrenda(s) {
    if (s !== '') {
    const tipprenda = await this.tipoprendaproService.getTipoPrendaId(s).subscribe(res => {
      this.tipoprenda = res;
    });
  }
  }

  async cargarPagos(s) {
    if (s !== '') {
   const pag = await this.pagoService.getPagoid(s).subscribe(res => {
     this.pago = res;
   });
  }
  }

  async cargarSubCategorias(s) {
    if (s !== '') {
    const sub = await this.subcategoriaproserivice.getSUbCategorias(s).subscribe(res => {
      this.subcategoria = res;
    });
  }
  }

  async cargarCategorias(s) {
    if (s !== '') {
    const cat = await this.categoriasService.getCategoria(s).subscribe(res => {
      this.categoria = res;
    });
  }
  }

  eliminarServicio(id) {
    this.misserviciosService.eliminarServicio(id);
    this.router.navigate(['../misservicios']);
  }

}
