import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoservicioPageRoutingModule } from './nuevoservicio-routing.module';

import { NuevoservicioPage } from './nuevoservicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NuevoservicioPageRoutingModule
  ],
  declarations: [NuevoservicioPage]
})
export class NuevoservicioPageModule {}
