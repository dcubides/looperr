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
  public idusuario: string;
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
    id: null,
    Categoria: ''
   };

   public CategoriaForm;
   public SubcategoriaForm;
   public TipoPrendaForm;
   public MaquinariaForm;
   public TipoInsumoForm;
   public DescripcionForm;
   public CantidadForm;
   public TipoPagoForm;
   public HorarioForm;
   public DomicilioForm;

   public categoriaSelect;

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
    this.cargarTipoInsumo();
    this.cargarMaquinaria();
    this.cargarCantidad();
  }

  combosSelectsCat(event) {
  this.categoriaSelect = event.detail.value;
  }

  combosSelectsSubCat(event) {
    this.cargarTipoPrenda(event.detail.value);
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

  async cargarTipoPrenda(subcategoria) {
    const tipprenda = await this.tipoprendaproService.getTipoPrendaCombos(this.categoriaSelect, subcategoria).subscribe(res => {
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
      this.inicializar();
      this.formulariPorCategoria();
  });
}

  inicializar() {

    this.misServiciosForm = this.formBuilder.group({
      Idusuario: this.idusuario,
      Categoria: new FormControl('', Validators.required),
      Subcategoria: new FormControl('', Validators.required),
      TipoPrenda: new FormControl('', Validators.required),
      Maquinaria: new FormControl('', Validators.required),
      TipoInsumo: new FormControl('', Validators.required),
      Descripcion: new FormControl('', Validators.maxLength(150)),
      Cantidad: new FormControl('', Validators.required),
      TipoPago: new FormControl('', Validators.required),
      Horario: new FormControl('', Validators.required),
      Domicilio: new FormControl('', Validators.required)
    });
  }

  formulariPorCategoria() {

    const CategoriaControl = this.misServiciosForm.get('Categoria');
    const SubcategoriaControl = this.misServiciosForm.get('Subcategoria');
    const TipoPrendaControl = this.misServiciosForm.get('TipoPrenda');
    const MaquinariaControl = this.misServiciosForm.get('Maquinaria');
    const TipoInsumoControl = this.misServiciosForm.get('TipoInsumo');
    const DescripcionControl = this.misServiciosForm.get('Descripcion');
    const CantidadControl = this.misServiciosForm.get('Cantidad');
    const TipoPagoControl = this.misServiciosForm.get('TipoPago');
    const HorarioControl = this.misServiciosForm.get('Horario');
    const DomicilioControl = this.misServiciosForm.get('Domicilio');


    if (this.categoriausuario.id === 1) {
      this.CategoriaForm = true;
      this.SubcategoriaForm = true;
      this.TipoPrendaForm = true;
      this.MaquinariaForm = false;
      this.TipoInsumoForm = false;
      this.DescripcionForm = true;
      this.CantidadForm = true;
      this.TipoPagoForm = true;
      this.HorarioForm = false;
      this.DomicilioForm = false;

      CategoriaControl.setValidators([Validators.required]);
      SubcategoriaControl.setValidators([Validators.required]);
      TipoPrendaControl.setValidators([Validators.required]);
      MaquinariaControl.setValidators(null);
      TipoInsumoControl.setValidators(null);
      DescripcionControl.setValidators([Validators.required]);
      CantidadControl.setValidators([Validators.required]);
      TipoPagoControl.setValidators([Validators.required]);
      HorarioControl.setValidators(null);
      DomicilioControl.setValidators(null);


    }

    if (this.categoriausuario.id === 2) {
      this.CategoriaForm = true;
      this.SubcategoriaForm = true;
      this.TipoPrendaForm = true;
      this.MaquinariaForm = true;
      this.TipoInsumoForm = false;
      this.DescripcionForm = true;
      this.CantidadForm = true;
      this.TipoPagoForm = true;
      this.HorarioForm = false;
      this.DomicilioForm = false;

      CategoriaControl.setValidators([Validators.required]);
      SubcategoriaControl.setValidators([Validators.required]);
      TipoPrendaControl.setValidators([Validators.required]);
      MaquinariaControl.setValidators([Validators.required]);
      TipoInsumoControl.setValidators(null);
      DescripcionControl.setValidators([Validators.required]);
      CantidadControl.setValidators([Validators.required]);
      TipoPagoControl.setValidators([Validators.required]);
      HorarioControl.setValidators(null);
      DomicilioControl.setValidators(null);

  }

    if (this.categoriausuario.id === 3) {
    this.CategoriaForm = false;
    this.SubcategoriaForm = false;
    this.TipoPrendaForm = false;
    this.MaquinariaForm = false;
    this.TipoInsumoForm = true;
    this.DescripcionForm = true;
    this.CantidadForm = false;
    this.TipoPagoForm = false;
    this.HorarioForm = true;
    this.DomicilioForm = true;

    CategoriaControl.setValidators(null);
    SubcategoriaControl.setValidators(null);
    TipoPrendaControl.setValidators(null);
    MaquinariaControl.setValidators(null);
    TipoInsumoControl.setValidators([Validators.required]);
    DescripcionControl.setValidators([Validators.required]);
    CantidadControl.setValidators(null);
    TipoPagoControl.setValidators(null);
    HorarioControl.setValidators([Validators.required]);
    DomicilioControl.setValidators([Validators.required]);

  }

    if (this.categoriausuario.id === 4) {
  this.CategoriaForm = false;
  this.SubcategoriaForm = false;
  this.TipoPrendaForm = false;
  this.MaquinariaForm = false;
  this.TipoInsumoForm = false;
  this.DescripcionForm = true;
  this.CantidadForm = false;
  this.TipoPagoForm = false;
  this.HorarioForm = true;
  this.DomicilioForm = true;

  CategoriaControl.setValidators(null);
  SubcategoriaControl.setValidators(null);
  TipoPrendaControl.setValidators(null);
  MaquinariaControl.setValidators(null);
  TipoInsumoControl.setValidators(null);
  DescripcionControl.setValidators([Validators.required]);
  CantidadControl.setValidators(null);
  TipoPagoControl.setValidators(null);
  HorarioControl.setValidators([Validators.required]);
  DomicilioControl.setValidators([Validators.required]);

}

    if (this.categoriausuario.id === 5) {
  this.CategoriaForm = false;
  this.SubcategoriaForm = false;
  this.TipoPrendaForm = false;
  this.MaquinariaForm = false;
  this.TipoInsumoForm = false;
  this.DescripcionForm = true;
  this.CantidadForm = false;
  this.TipoPagoForm = false;
  this.HorarioForm = true;
  this.DomicilioForm = true;

  CategoriaControl.setValidators(null);
  SubcategoriaControl.setValidators(null);
  TipoPrendaControl.setValidators(null);
  MaquinariaControl.setValidators(null);
  TipoInsumoControl.setValidators(null);
  DescripcionControl.setValidators([Validators.required]);
  CantidadControl.setValidators(null);
  TipoPagoControl.setValidators(null);
  HorarioControl.setValidators([Validators.required]);
  DomicilioControl.setValidators([Validators.required]);
}

    if (this.categoriausuario.id === 6) {
  this.CategoriaForm = false;
  this.SubcategoriaForm = false;
  this.TipoPrendaForm = false;
  this.MaquinariaForm = false;
  this.TipoInsumoForm = false;
  this.DescripcionForm = true;
  this.CantidadForm = false;
  this.TipoPagoForm = false;
  this.HorarioForm = true;
  this.DomicilioForm = true;

  CategoriaControl.setValidators(null);
  SubcategoriaControl.setValidators(null);
  TipoPrendaControl.setValidators(null);
  MaquinariaControl.setValidators(null);
  TipoInsumoControl.setValidators(null);
  DescripcionControl.setValidators([Validators.required]);
  CantidadControl.setValidators(null);
  TipoPagoControl.setValidators(null);
  HorarioControl.setValidators([Validators.required]);
  DomicilioControl.setValidators([Validators.required]);
}

    if (this.categoriausuario.id === 7) {
  this.CategoriaForm = false;
  this.SubcategoriaForm = false;
  this.TipoPrendaForm = false;
  this.MaquinariaForm = true;
  this.TipoInsumoForm = false;
  this.DescripcionForm = true;
  this.CantidadForm = false;
  this.TipoPagoForm = true;
  this.HorarioForm = false;
  this.DomicilioForm = false;

  CategoriaControl.setValidators(null);
  SubcategoriaControl.setValidators(null);
  TipoPrendaControl.setValidators(null);
  MaquinariaControl.setValidators([Validators.required]);
  TipoInsumoControl.setValidators(null);
  DescripcionControl.setValidators([Validators.required]);
  CantidadControl.setValidators(null);
  TipoPagoControl.setValidators([Validators.required]);
  HorarioControl.setValidators([Validators.required]);
  DomicilioControl.setValidators([Validators.required]);
}

    if (this.categoriausuario.id === 8) {
  this.CategoriaForm = false;
  this.SubcategoriaForm = false;
  this.TipoPrendaForm = false;
  this.MaquinariaForm = false;
  this.TipoInsumoForm = false;
  this.DescripcionForm = false;
  this.CantidadForm = false;
  this.TipoPagoForm = false;
  this.HorarioForm = false;
  this.DomicilioForm = false;

}

}

  async registerForm() {
    this.misServiciosForm.value.Idusuario = this.idusuario;

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
