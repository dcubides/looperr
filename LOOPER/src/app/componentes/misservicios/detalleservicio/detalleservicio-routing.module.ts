import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleservicioPage } from './detalleservicio.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleservicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleservicioPageRoutingModule {}
