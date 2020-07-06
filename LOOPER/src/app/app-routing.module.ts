import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { NologinGuard } from './guard/nologin.guard';

const routes: Routes = [
  /*{
    path: 'folder',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },*/
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule),
    canActivate : [NologinGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./componentes/home/home.module').then( m => m.HomePageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'servicios',
    loadChildren: () => import('./componentes/servicios/servicios.module').then( m => m.ServiciosPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'misservicios',
    loadChildren: () => import('./componentes/misservicios/misservicios.module').then( m => m.MisserviciosPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'historial',
    loadChildren: () => import('./componentes/historial/historial.module').then( m => m.HistorialPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./componentes/registro/registro.module').then( m => m.RegistroPageModule),
    canActivate : [NologinGuard]
  },
  {
    path: 'disponibilidad',
    loadChildren: () => import('./componentes/disponibilidad/disponibilidad.module').then( m => m.DisponibilidadPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./componentes/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate : [AuthGuard]
  },  {
    path: 'configuracion',
    loadChildren: () => import('./componentes/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
