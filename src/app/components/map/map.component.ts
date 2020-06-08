import { Component, AfterViewInit, Input, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import * as L from "leaflet";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/models/app-state.model';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  
  constructor(private store: Store<AppState>) { }

  private map: L.Map;
  @Input() public lat;
  @Input() public lon;
  @Input() public city;

  private initMap(): void {
    console.log(this.lon);
    this.map = L.map('map', {
      center: [ this.lat, this.lon ],
      zoom: 13
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

  }

  private setPosition(lat: number, lon: number) {
    this.map.panTo(new L.LatLng(lat, lon));
    L.popup().setLatLng(new L.LatLng(lat, lon)).setContent(`<h2>${this.city}</h2><p>Latitude: ${this.lat}</p><p>Longitude: ${this.lon}</p>`).openOn(this.map);
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map) {
      this.setPosition(changes.lat.currentValue, changes.lon.currentValue);
    }
  }

  ngOnInit(): void {
    this.initMap();
  }

}
