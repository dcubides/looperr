import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'heart-circle'
    },
    {
      title: 'Mi Perfil',
      url: '/perfil',
      icon: 'person-circle'
    },
    {
      title: 'Buscar Servicios',
      url: '/servicios',
      icon: 'search-circle'
    },
    {
      title: 'Mis Servicios',
      url: '/misservicios',
      icon: 'ellipsis-vertical-circle'
    },
    {
      title: 'Registros',
      url: '/historial',
      icon: 'information-circle'
    },
    {
      title: 'Disponibilidad',
      url: '/disponibilidad',
      icon: 'list-circle'
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    private AFAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  singout() {
    this.AFAuth.auth.signOut().then( () => {
      this.router.navigate(['/login']);
    });
  }

}
