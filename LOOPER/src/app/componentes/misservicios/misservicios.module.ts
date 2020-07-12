import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisserviciosPageRoutingModule } from './misservicios-routing.module';

import { MisserviciosPage } from './misservicios.page';
import { NuevoservicioPageModule } from './nuevoservicio/nuevoservicio.module';
import { DetalleservicioPageModule } from './detalleservicio/detalleservicio.module';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MisserviciosPageRoutingModule,
    NuevoservicioPageModule,
    DetalleservicioPageModule
  ],
  declarations: [MisserviciosPage]
})
export class MisserviciosPageModule {}
