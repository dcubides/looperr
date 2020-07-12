import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleservicioPageRoutingModule } from './detalleservicio-routing.module';

import { DetalleservicioPage } from './detalleservicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleservicioPageRoutingModule
  ],
  declarations: [DetalleservicioPage]
})
export class DetalleservicioPageModule {}
