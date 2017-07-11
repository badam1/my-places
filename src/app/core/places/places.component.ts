import { Component, OnInit } from '@angular/core';
import { GeocodingApiService } from '../place-form/geocoding.service';
import { Place } from '../place.model';
import { PlacesService } from './places.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  // BUDAPEST
  lat = 47.498924;
  lng = 19.040579;
  places: Place[] = [];

  constructor(private placesService: PlacesService) {
  }

  ngOnInit() {
    this.places = this.placesService.getPlaces();
  }

}
