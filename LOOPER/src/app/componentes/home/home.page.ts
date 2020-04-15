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

  @ViewChild('map', {static: true}) mapElement: ElementRef;
  map: any;
  markers = [];

  constructor(
    private afAuth: AngularFireAuth
    ) { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    const latLng = new google.maps.LatLng(51.90, 7.66);

    const mapOptions = {
      center: latLng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

}
