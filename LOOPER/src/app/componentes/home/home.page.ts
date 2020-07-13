import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Plugins } from '@capacitor/core';
import { map } from 'rxjs/operators';
const { Geolocation } = Plugins;

declare var google;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  constructor(
    private afAuth: AngularFireAuth
    ) { }

  ngOnInit() {

  }


}
