import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisserviciosPageRoutingModule } from './misservicios-routing.module';

import { MisserviciosPage } from './misservicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisserviciosPageRoutingModule
  ],
  declarations: [MisserviciosPage]
})
export class MisserviciosPageModule {}
