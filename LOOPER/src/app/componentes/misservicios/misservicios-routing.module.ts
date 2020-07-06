import { NuevoservicioPageModule } from './nuevoservicio/nuevoservicio.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisserviciosPage } from './misservicios.page';

const routes: Routes = [
  {
    path: '',
    component: MisserviciosPage
  },
  {
    path: 'nuevoservicio',
    loadChildren: () => import('./nuevoservicio/nuevoservicio.module').then( m => m.NuevoservicioPageModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisserviciosPageRoutingModule {}
